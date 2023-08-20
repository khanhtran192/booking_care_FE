// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { departments } from "@/fakeDatabase";
import { getId } from "@/fakeDatabase/getApi";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	res.status(200).json(getId(departments, req));
}
