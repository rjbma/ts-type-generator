declare namespace PetStoreComponents {
  namespace RequestBodies {
    export type Pet = Schemas.Pet;
    export type UserArray = Schemas.User[];
  }
  namespace Schemas {
    export interface ApiResponse {
      code?: number; // int32
      type?: string;
      message?: string;
    }
    export interface Category {
      /**
       * example:
       * 1
       */
      id?: number; // int64
      /**
       * example:
       * Dogs
       */
      name?: string;
    }
    export interface Order {
      /**
       * example:
       * 10
       */
      id?: number; // int64
      /**
       * example:
       * 198772
       */
      petId?: number; // int64
      /**
       * example:
       * 7
       */
      quantity?: number; // int32
      shipDate?: string; // date-time
      /**
       * Order Status
       * example:
       * approved
       */
      status?: "placed" | "approved" | "delivered";
      complete?: boolean;
    }
    export interface Pet {
      /**
       * example:
       * 10
       */
      id?: number; // int64
      /**
       * example:
       * doggie
       */
      name: string;
      category?: Category;
      photoUrls: string[];
      tags?: Tag[];
      /**
       * pet status in the store
       */
      status?: "available" | "pending" | "sold";
    }
    export interface Tag {
      id?: number; // int64
      name?: string;
    }
    export interface User {
      /**
       * example:
       * 10
       */
      id?: number; // int64
      /**
       * example:
       * theUser
       */
      username?: string;
      /**
       * example:
       * John
       */
      firstName?: string;
      /**
       * example:
       * James
       */
      lastName?: string;
      /**
       * example:
       * john@email.com
       */
      email?: string;
      /**
       * example:
       * 12345
       */
      password?: string;
      /**
       * example:
       * 12345
       */
      phone?: string;
      /**
       * User Status
       * example:
       * 1
       */
      userStatus?: number; // int32
    }
  }
}
declare namespace PetStorePaths {
  namespace AddPet {
    export type RequestBody = PetStoreComponents.Schemas.Pet;
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Pet;
      export interface $400 {}
      export interface $422 {}
      export interface Default {}
    }
    interface Config {
      operationId: "addPet";
      method: "post";
      expressPath: "/pet";
      openapiPath: "/pet";
      pathParams?: any;
      responses:
        | AddPet.Responses.$200
        | AddPet.Responses.$400
        | AddPet.Responses.$422
        | AddPet.Responses.Default;
      successResponses: AddPet.Responses.$200;
      requestBody: AddPet.RequestBody;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace CreateUser {
    export type RequestBody = PetStoreComponents.Schemas.User;
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.User;
      export interface Default {}
    }
    interface Config {
      operationId: "createUser";
      method: "post";
      expressPath: "/user";
      openapiPath: "/user";
      pathParams?: any;
      responses: CreateUser.Responses.$200 | CreateUser.Responses.Default;
      successResponses: CreateUser.Responses.$200;
      requestBody: CreateUser.RequestBody;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace CreateUsersWithListInput {
    export type RequestBody = PetStoreComponents.Schemas.User[];
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.User;
      export interface Default {}
    }
    interface Config {
      operationId: "createUsersWithListInput";
      method: "post";
      expressPath: "/user/createWithList";
      openapiPath: "/user/createWithList";
      pathParams?: any;
      responses:
        | CreateUsersWithListInput.Responses.$200
        | CreateUsersWithListInput.Responses.Default;
      successResponses: CreateUsersWithListInput.Responses.$200;
      requestBody: CreateUsersWithListInput.RequestBody;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace DeleteOrder {
    namespace Parameters {
      export type OrderId = number; // int64
    }
    export interface PathParameters {
      orderId: Parameters.OrderId /* int64 */;
    }
    namespace Responses {
      export interface $200 {}
      export interface $400 {}
      export interface $404 {}
      export interface Default {}
    }
    interface Config {
      operationId: "deleteOrder";
      method: "delete";
      expressPath: "/store/order/:orderId";
      openapiPath: "/store/order/{orderId}";
      pathParams: DeleteOrder.PathParameters;
      responses:
        | DeleteOrder.Responses.$200
        | DeleteOrder.Responses.$400
        | DeleteOrder.Responses.$404
        | DeleteOrder.Responses.Default;
      successResponses: DeleteOrder.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace DeletePet {
    export interface HeaderParameters {
      api_key?: Parameters.ApiKey;
    }
    namespace Parameters {
      export type ApiKey = string;
      export type PetId = number; // int64
    }
    export interface PathParameters {
      petId: Parameters.PetId /* int64 */;
    }
    namespace Responses {
      export interface $200 {}
      export interface $400 {}
      export interface Default {}
    }
    interface Config {
      operationId: "deletePet";
      method: "delete";
      expressPath: "/pet/:petId";
      openapiPath: "/pet/{petId}";
      pathParams: DeletePet.PathParameters;
      responses:
        | DeletePet.Responses.$200
        | DeletePet.Responses.$400
        | DeletePet.Responses.Default;
      successResponses: DeletePet.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers: DeletePet.HeaderParameters;
    }
  }
  namespace DeleteUser {
    namespace Parameters {
      export type Username = string;
    }
    export interface PathParameters {
      username: Parameters.Username;
    }
    namespace Responses {
      export interface $200 {}
      export interface $400 {}
      export interface $404 {}
      export interface Default {}
    }
    interface Config {
      operationId: "deleteUser";
      method: "delete";
      expressPath: "/user/:username";
      openapiPath: "/user/{username}";
      pathParams: DeleteUser.PathParameters;
      responses:
        | DeleteUser.Responses.$200
        | DeleteUser.Responses.$400
        | DeleteUser.Responses.$404
        | DeleteUser.Responses.Default;
      successResponses: DeleteUser.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace FindPetsByStatus {
    namespace Parameters {
      export type Status = "available" | "pending" | "sold";
    }
    export interface QueryParameters {
      status: Parameters.Status;
    }
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Pet[];
      export interface $400 {}
      export interface Default {}
    }
    interface Config {
      operationId: "findPetsByStatus";
      method: "get";
      expressPath: "/pet/findByStatus";
      openapiPath: "/pet/findByStatus";
      pathParams?: any;
      responses:
        | FindPetsByStatus.Responses.$200
        | FindPetsByStatus.Responses.$400
        | FindPetsByStatus.Responses.Default;
      successResponses: FindPetsByStatus.Responses.$200;
      requestBody?: any;
      queryParams: FindPetsByStatus.QueryParameters;
      headers?: any;
    }
  }
  namespace FindPetsByTags {
    namespace Parameters {
      export type Tags = string[];
    }
    export interface QueryParameters {
      tags: Parameters.Tags;
    }
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Pet[];
      export interface $400 {}
      export interface Default {}
    }
    interface Config {
      operationId: "findPetsByTags";
      method: "get";
      expressPath: "/pet/findByTags";
      openapiPath: "/pet/findByTags";
      pathParams?: any;
      responses:
        | FindPetsByTags.Responses.$200
        | FindPetsByTags.Responses.$400
        | FindPetsByTags.Responses.Default;
      successResponses: FindPetsByTags.Responses.$200;
      requestBody?: any;
      queryParams: FindPetsByTags.QueryParameters;
      headers?: any;
    }
  }
  namespace GetInventory {
    namespace Responses {
      export interface $200 {
        [name: string]: number; // int32
      }
      export interface Default {}
    }
    interface Config {
      operationId: "getInventory";
      method: "get";
      expressPath: "/store/inventory";
      openapiPath: "/store/inventory";
      pathParams?: any;
      responses: GetInventory.Responses.$200 | GetInventory.Responses.Default;
      successResponses: GetInventory.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace GetOrderById {
    namespace Parameters {
      export type OrderId = number; // int64
    }
    export interface PathParameters {
      orderId: Parameters.OrderId /* int64 */;
    }
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Order;
      export interface $400 {}
      export interface $404 {}
      export interface Default {}
    }
    interface Config {
      operationId: "getOrderById";
      method: "get";
      expressPath: "/store/order/:orderId";
      openapiPath: "/store/order/{orderId}";
      pathParams: GetOrderById.PathParameters;
      responses:
        | GetOrderById.Responses.$200
        | GetOrderById.Responses.$400
        | GetOrderById.Responses.$404
        | GetOrderById.Responses.Default;
      successResponses: GetOrderById.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace GetPetById {
    namespace Parameters {
      export type PetId = number; // int64
    }
    export interface PathParameters {
      petId: Parameters.PetId /* int64 */;
    }
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Pet;
      export interface $400 {}
      export interface $404 {}
      export interface Default {}
    }
    interface Config {
      operationId: "getPetById";
      method: "get";
      expressPath: "/pet/:petId";
      openapiPath: "/pet/{petId}";
      pathParams: GetPetById.PathParameters;
      responses:
        | GetPetById.Responses.$200
        | GetPetById.Responses.$400
        | GetPetById.Responses.$404
        | GetPetById.Responses.Default;
      successResponses: GetPetById.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace GetUserByName {
    namespace Parameters {
      export type Username = string;
    }
    export interface PathParameters {
      username: Parameters.Username;
    }
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.User;
      export interface $400 {}
      export interface $404 {}
      export interface Default {}
    }
    interface Config {
      operationId: "getUserByName";
      method: "get";
      expressPath: "/user/:username";
      openapiPath: "/user/{username}";
      pathParams: GetUserByName.PathParameters;
      responses:
        | GetUserByName.Responses.$200
        | GetUserByName.Responses.$400
        | GetUserByName.Responses.$404
        | GetUserByName.Responses.Default;
      successResponses: GetUserByName.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace LoginUser {
    namespace Parameters {
      export type Password = string;
      export type Username = string;
    }
    export interface QueryParameters {
      username?: Parameters.Username;
      password?: Parameters.Password;
    }
    namespace Responses {
      export type $200 = string;
      export interface $400 {}
      export interface Default {}
    }
    interface Config {
      operationId: "loginUser";
      method: "get";
      expressPath: "/user/login";
      openapiPath: "/user/login";
      pathParams?: any;
      responses:
        | LoginUser.Responses.$200
        | LoginUser.Responses.$400
        | LoginUser.Responses.Default;
      successResponses: LoginUser.Responses.$200;
      requestBody?: any;
      queryParams: LoginUser.QueryParameters;
      headers?: any;
    }
  }
  namespace LogoutUser {
    namespace Responses {
      export interface $200 {}
      export interface Default {}
    }
    interface Config {
      operationId: "logoutUser";
      method: "get";
      expressPath: "/user/logout";
      openapiPath: "/user/logout";
      pathParams?: any;
      responses: LogoutUser.Responses.$200 | LogoutUser.Responses.Default;
      successResponses: LogoutUser.Responses.$200;
      requestBody?: any;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace PlaceOrder {
    export type RequestBody = PetStoreComponents.Schemas.Order;
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Order;
      export interface $400 {}
      export interface $422 {}
      export interface Default {}
    }
    interface Config {
      operationId: "placeOrder";
      method: "post";
      expressPath: "/store/order";
      openapiPath: "/store/order";
      pathParams?: any;
      responses:
        | PlaceOrder.Responses.$200
        | PlaceOrder.Responses.$400
        | PlaceOrder.Responses.$422
        | PlaceOrder.Responses.Default;
      successResponses: PlaceOrder.Responses.$200;
      requestBody: PlaceOrder.RequestBody;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace UpdatePet {
    export type RequestBody = PetStoreComponents.Schemas.Pet;
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Pet;
      export interface $400 {}
      export interface $404 {}
      export interface $422 {}
      export interface Default {}
    }
    interface Config {
      operationId: "updatePet";
      method: "put";
      expressPath: "/pet";
      openapiPath: "/pet";
      pathParams?: any;
      responses:
        | UpdatePet.Responses.$200
        | UpdatePet.Responses.$400
        | UpdatePet.Responses.$404
        | UpdatePet.Responses.$422
        | UpdatePet.Responses.Default;
      successResponses: UpdatePet.Responses.$200;
      requestBody: UpdatePet.RequestBody;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace UpdatePetWithForm {
    namespace Parameters {
      export type Name = string;
      export type PetId = number; // int64
      export type Status = string;
    }
    export interface PathParameters {
      petId: Parameters.PetId /* int64 */;
    }
    export interface QueryParameters {
      name?: Parameters.Name;
      status?: Parameters.Status;
    }
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.Pet;
      export interface $400 {}
      export interface Default {}
    }
    interface Config {
      operationId: "updatePetWithForm";
      method: "post";
      expressPath: "/pet/:petId";
      openapiPath: "/pet/{petId}";
      pathParams: UpdatePetWithForm.PathParameters;
      responses:
        | UpdatePetWithForm.Responses.$200
        | UpdatePetWithForm.Responses.$400
        | UpdatePetWithForm.Responses.Default;
      successResponses: UpdatePetWithForm.Responses.$200;
      requestBody?: any;
      queryParams: UpdatePetWithForm.QueryParameters;
      headers?: any;
    }
  }
  namespace UpdateUser {
    namespace Parameters {
      export type Username = string;
    }
    export interface PathParameters {
      username: Parameters.Username;
    }
    export type RequestBody = PetStoreComponents.Schemas.User;
    namespace Responses {
      export interface $200 {}
      export interface $400 {}
      export interface $404 {}
      export interface Default {}
    }
    interface Config {
      operationId: "updateUser";
      method: "put";
      expressPath: "/user/:username";
      openapiPath: "/user/{username}";
      pathParams: UpdateUser.PathParameters;
      responses:
        | UpdateUser.Responses.$200
        | UpdateUser.Responses.$400
        | UpdateUser.Responses.$404
        | UpdateUser.Responses.Default;
      successResponses: UpdateUser.Responses.$200;
      requestBody: UpdateUser.RequestBody;
      queryParams?: any;
      headers?: any;
    }
  }
  namespace UploadFile {
    namespace Parameters {
      export type AdditionalMetadata = string;
      export type PetId = number; // int64
    }
    export interface PathParameters {
      petId: Parameters.PetId /* int64 */;
    }
    export interface QueryParameters {
      additionalMetadata?: Parameters.AdditionalMetadata;
    }
    export type RequestBody = string; // binary
    namespace Responses {
      export type $200 = PetStoreComponents.Schemas.ApiResponse;
      export interface $400 {}
      export interface $404 {}
      export interface Default {}
    }
    interface Config {
      operationId: "uploadFile";
      method: "post";
      expressPath: "/pet/:petId/uploadImage";
      openapiPath: "/pet/{petId}/uploadImage";
      pathParams: UploadFile.PathParameters;
      responses:
        | UploadFile.Responses.$200
        | UploadFile.Responses.$400
        | UploadFile.Responses.$404
        | UploadFile.Responses.Default;
      successResponses: UploadFile.Responses.$200;
      requestBody: UploadFile.RequestBody;
      queryParams: UploadFile.QueryParameters;
      headers?: any;
    }
  }
}
