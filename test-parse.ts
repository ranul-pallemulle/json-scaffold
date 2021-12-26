import { generateJson, JsonScaffold, parseJson } from "./json-scaffold";

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
                            }
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
                        }
                    }
                ]
            }
        }
    ]
}

const json = `{
    "name": "Ranul",
    "age": 25,
    "school": {
      "name": "Some School",
      "address": {
        "line1": "school addr line 1",
        "city": "SchoolTown",
        "phones": [
          "077123",
          "077345"
        ]
      }
    },
    "addresses": [
      {
        "line1": "addr 1 line 1",
        "city": "Colombo",
        "phones": [
          "011234",
          "011345"
        ]
      },
      {
        "line1": "addr 2 line 1",
        "city": "Belarus",
        "phones": [
          "011456"
        ]
      }
    ]
  }`;

const parsed = parseJson(json, scaffold);
console.log(JSON.stringify(parsed));
//const regenerated = generateJson(parsed);
//console.log(regenerated);