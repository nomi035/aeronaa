import { ServerDescription } from "typeorm";

export const courseCreate = {
    loginBody: {
      description: 'Body for creating course',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
        },
      },
    },


  };
