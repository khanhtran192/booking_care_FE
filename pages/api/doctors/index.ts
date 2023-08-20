// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doctors } from "@/fakeDatabase";
import { getListApi } from "@/fakeDatabase/getApi";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	res.status(200).json(getListApi(req, doctors));
}
