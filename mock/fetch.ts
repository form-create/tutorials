import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/options",
    method: "get",
    response(processedRequest, _, response) {
      const { headers } = processedRequest;
      if (headers["authorization"].includes("Bearer")) {
        return {
          code: 200,
          message: "ok",
          data: {
            admin: "管理员",
            common: "普通用户",
            tester: "测试用户"
          }
        };
      } else {
        response.statusCode = 401;
        return {
          code: 401,
          message: "forbid",
          data: null
        };
      }
    }
  }
]);
