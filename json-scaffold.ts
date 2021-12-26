import * as uuid from 'uuid';

export interface JsonScaffold {
    id: string;
    type: 'string'|'number'|'boolean'|'object'|'array';
    format?: 'base64';
    name?: string;
    properties?: JsonScaffold[];
    items?: JsonScaffold;
    defaultValue?: string|boolean|number;
    valueGroups?: JsonValueGroup[];
}

export interface JsonValueGroup {
    parentContainerObjectId?: string;
    containers: JsonValueContainer[];
}

export interface JsonValueContainer {
    order: number;
    values: JsonValue[];
    objectId: string;
}

export interface JsonValue {
    itemId: string;
    valueType: 'plain';
    value?: string | number | boolean;
}

export function generateJson(set: JsonScaffold): string {
    const baseGroup = set.valueGroups[0];
    const baseContainer = baseGroup.containers[0];
    const obj = generateJsonFromScaffold(set, baseContainer);
    return JSON.stringify(obj);
}

export function parseJson(json: string, set: JsonScaffold): JsonScaffold {
    const baseGroup: JsonValueGroup = {
        containers: [{
            objectId: uuid.v4(),
            order: 0,
            values: []
        }]
    };
    const reset = (ss: JsonScaffold): JsonScaffold => {
        const res = { ...ss };
        if (res.type === 'object') {
            for (let i = 0; i < res.properties.length; ++i) {
                const sss = res.properties[i];
                res.properties[i] = reset(sss);
            }
        }
        if (res.type === 'array') {
            res.valueGroups = [];
            res.items = reset(res.items);
        }
        return res;
    }
    const initialSet = reset(set);
    initialSet.valueGroups = [baseGroup];
    const jsonParsed = JSON.parse(json);
    completeScaffoldFromJson(initialSet, baseGroup.containers[0], jsonParsed);
    return initialSet;
}

function completeScaffoldFromJson(set: JsonScaffold, container: JsonValueContainer, jsonItem: any): void {
    if (set.type === 'object') {
        for (let i = 0; i < set.properties.length; ++i) {
            const sub = set.properties[i];
            if (sub.type === 'object' || sub.type === 'array') {
                const subJsonItem = jsonItem[sub.name];
                completeScaffoldFromJson(sub, container, subJsonItem);
                continue;
            }
            // sub.type === 'string'|'number'|'boolean'
            const value: JsonValue = {
                itemId: sub.id,
                valueType: 'plain',
                value: jsonItem[sub.name]
            };
            container.values.push(value); 
        }
    }
    if (set.type === 'array') {
        if (!set.valueGroups) {
            set.valueGroups = [];
        }
        let group = set.valueGroups.find(g => g.parentContainerObjectId === container.objectId);
        if (!group) {
            group = {
                parentContainerObjectId: container.objectId,
                containers: []
            };
            set.valueGroups.push(group);
        }
        const sub = set.items;
        if (sub.type === 'object' || sub.type === 'array') {
            for (let i = 0; i < jsonItem.length; ++i) {
                const token = jsonItem[i];
                const subContainer: JsonValueContainer = {
                    objectId: uuid.v4(),
                    order: i,
                    values: []
                };
                group.containers.push(subContainer);
                completeScaffoldFromJson(sub, subContainer, token);
            }
            return;
        }
        for (let i = 0; i < jsonItem.length; ++i) {
            const value = jsonItem[i];
            const subContainer: JsonValueContainer = {
                objectId: uuid.v4(),
                order: i,
                values: [
                    {
                        itemId: sub.id,
                        valueType: 'plain',
                        value: value,
                    }
                ]
            };
            group.containers.push(subContainer);
        }
    }
}

function generateJsonFromScaffold(set: JsonScaffold, container: JsonValueContainer): Object {
    if (set.type === 'object') {
        const result = {};
        for (let i = 0; i < set.properties.length; ++i) {
            const sub = set.properties[i];
            if (sub.type === 'object' || sub.type === 'array') {
                const subJson = generateJsonFromScaffold(sub, container);
                result[sub.name] = subJson;
                continue;
            }
            // sub.type === 'string'|'number'|'boolean'
            const value = container.values.find(v => v.itemId === sub.id);
            if (value) {
                result[sub.name] = value.value;
            }
        }
        return result;
    }
    if (set.type === 'array') {
        const result = [];
        const sub = set.items;
        const group = set.valueGroups.find(g => g.parentContainerObjectId === container.objectId);
        const orderedSubContainers = group.containers.sort((a, b) => a.order - b.order);
        if (sub.type === 'object' || sub.type === 'array') {
            for (let i = 0; i < orderedSubContainers.length; ++i) {
                const subContainer = orderedSubContainers[i];
                const subJson = generateJsonFromScaffold(sub, subContainer);
                result.push(subJson);
            }
            return result;
        }
        for (let i = 0; i < orderedSubContainers.length; ++i) {
            const subContainer = orderedSubContainers[i];
            const value = subContainer.values.find(v => v.itemId === sub.id);
            if (value) {
                result.push(value.value);
            }
        }
        return result;
    }
    throw new Error('_generateJsonFromScaffold can only be invoked with object or array type scaffolds');
}