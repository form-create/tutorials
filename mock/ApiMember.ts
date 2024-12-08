import { defineFakeRoute } from "vite-plugin-fake-server/client";

const members = [
  {
    id: "000001",
    name: "管理员1",
    mobile: "13800000000",
    deptId: "1"
  },
  {
    id: "000002",
    name: "管理员2",
    mobile: "13800000001",
    deptId: "1"
  },
  {
    id: "000003",
    name: "管理员3",
    mobile: "13800000002",
    deptId: "1"
  },
  {
    id: "000004",
    name: "用户1",
    mobile: "13800000003",
    deptId: "2"
  },
  {
    id: "000005",
    name: "用户2",
    mobile: "13800000004",
    deptId: "2"
  },
  {
    id: "000006",
    name: "用户3",
    mobile: "13800000005",
    deptId: "2"
  },
  {
    id: "000007",
    name: "用户4",
    mobile: "13800000006",
    deptId: "2"
  }
];

export default defineFakeRoute([
  {
    url: "/member/:deptId",
    method: "get",
    response(processedRequest) {
      const { params } = processedRequest;
      const deptId = params.deptId || "list";

      if (deptId === "list") {
        return {
          code: 200,
          message: "ok",
          data: members
        };
      } else {
        return {
          code: 200,
          message: "ok",
          data: members.filter(item => item.deptId === deptId)
        };
      }
    }
  }
]);
