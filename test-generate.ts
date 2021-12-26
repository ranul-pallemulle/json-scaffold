import { generateJson, JsonScaffold } from "./json-scaffold";

const scaffold: JsonScaffold = {
    id: "zzzz",
    type: "object",
    properties: [
        {
            id: "a",
            name: "name",
            type: "string"
        },
        {
            id: "b",
            name: "age",
            type: "number"
        },
        {
            id: "c",
            name: "school",
            type: "object",
            properties: [
                {
                    id: "d",
                    name: "name",
                    type: "string"
                },
                {
                    id: "e",
                    name: "address",
                    type: "object",
                    properties: [
                        {
                            id: "f",
                            name: "line1",
                            type: "string"
                        },
                        {
                            id: "g",
                            name: "city",
                            type: "string"
                        },
                        {
                            id: "h",
                            name: "phones",
                            type: "array",
                            items: {
                                id: "i",
                                type: "string"
                            },
                            valueGroups: [
                                {
                                    parentContainerObjectId: "aaa",
                                    containers: [
                                        {
                                            objectId: "aaaa",
                                            order: 0,
                                            values: [
                                                {
                                                    itemId: "i",
                                                    valueType: "plain",
                                                    value: "077123"
                                                }
                                            ]
                                        },
                                        {
                                            objectId: "aaab",
                                            order: 1,
                                            values: [
                                                {
                                                    itemId: "i",
                                                    valueType: "plain",
                                                    value: "077345"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "j",
            name: "addresses",
            type: "array",
            items: {
                id: "k",
                type: "object",
                properties: [
                    {
                        id: "l",
                        name: "line1",
                        type: "string"
                    },
                    {
                        id: "m",
                        name: "city",
                        type: "string"
                    },
                    {
                        id: "n",
                        name: "phones",
                        type: "array",
                        items: {
                            id: "o",
                            type: "string"
                        },
                        valueGroups: [
                            {
                                parentContainerObjectId: "aaac",
                                containers: [
                                    {
                                        objectId: "aaaaa",
                                        order: 0,
                                        values: [
                                            {
                                                itemId: "o",
                                                valueType: "plain",
                                                value: "011234"
                                            }
                                        ]
                                    },
                                    {
                                        objectId: "aaaab",
                                        order: 1,
                                        values: [
                                            {
                                                itemId: "o",
                                                valueType: "plain",
                                                value: "011345"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                parentContainerObjectId: "aaad",
                                containers: [
                                    {
                                        objectId: "aaaac",
                                        order: 0,
                                        values: [
                                            {
                                                itemId: "o",
                                                valueType: "plain",
                                                value: "011456"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            valueGroups: [
                {
                    parentContainerObjectId: "aaa",
                    containers: [
                        {
                            objectId: "aaac",
                            order: 0,
                            values: [
                                {
                                    itemId: "l",
                                    valueType: "plain",
                                    value: "addr 1 line 1"
                                },
                                {
                                    itemId: "m",
                                    valueType: "plain",
                                    value: "Colombo"
                                },
                            ]
                        },
                        {
                            objectId: "aaad",
                            order: 1,
                            values: [
                                {
                                    itemId: "l",
                                    valueType: "plain",
                                    value: "addr 2 line 1"
                                },
                                {
                                    itemId: "m",
                                    valueType: "plain",
                                    value: "Belarus"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    valueGroups: [
        {
            containers: [
                {
                    objectId: "aaa",
                    order: 0,
                    values: [
                        {
                            itemId: "a",
                            valueType: 'plain',
                            value: "Ranul"
                        },
                        {
                            itemId: "b",
                            valueType: 'plain',
                            value: 25,
                        },
                        {
                            itemId: "d",
                            valueType: "plain",
                            value: "Some School"
                        }
                    ]
                }
            ]
        }
    ]
}

const json = generateJson(scaffold);
console.log(json);