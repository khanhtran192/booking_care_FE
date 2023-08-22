// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { users } from "@/fakeDatabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res
		.status(200)
		.json(users.find((user) => user.username === req.body.username));
}
