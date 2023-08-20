// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { departments, hospitals } from "@/fakeDatabase";
import { getId, getListApi } from "@/fakeDatabase/getApi";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(getListApi(req, departments));
}
