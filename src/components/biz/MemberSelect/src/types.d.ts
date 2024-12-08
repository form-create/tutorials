type Member = {
  id: string;
  name: string;
  mobile: string;
  deptId: string;
};

type MemberApiParams = {
  deptId?: string;
};

type MemberApiResponse = {
  code: number;
  data: Member[] | null;
  message: string;
};

export type { MemberApiResponse, MemberApiParams, Member };
