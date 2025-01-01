import { OpenAPIObject } from '@nestjs/swagger';

const pathMethods = ['get', 'post', 'put', 'delete', 'patch'];

const generalResponses = {
  400: {
    description: 'Bad Request. The client provided invalid data.',
  },
  401: {
    description: 'Unauthorized. Authentication is required.',
  },
  403: {
    description: 'Forbidden. The client does not have access rights.',
  },
  404: {
    description: 'Not Found. The requested resource could not be found.',
  },
  500: {
    description: 'Internal Server Error. A server error occurred.',
  },
};

const authResponses = {
  401: { description: 'Unauthorized. Authentication is required.' },
  403: { description: 'Forbidden. Access is denied.' },
};

const deleteResponses = {
  204: { description: 'No Content. The resource was deleted successfully.' },
};

export class SwaggerHelper {
  static setDefaultResponses(document: OpenAPIObject): void {
    for (const key of Object.keys(document.paths)) {
      for (const method of pathMethods) {
        const route = document.paths[key]?.[method];
        if (route) {
          Object.assign(route.responses, generalResponses);
          if (route.security) {
            Object.assign(route.responses, authResponses);
          }
          if (method === 'delete') {
            delete route.responses[200];
            Object.assign(route.responses, deleteResponses);
          }
        }
      }
    }
  }
}
