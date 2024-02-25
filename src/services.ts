import Prisma from "./db";
import { iPostCreate } from "./interface";


class PostServices {
	public create(data: iPostCreate) {
		return Prisma.post.create({
			data: data
		})
	}

	public getPostsAll(){
		return Prisma.post.findMany()
	}

	public getPostOne(id: number){
		return Prisma.post.findUnique({
			where: {
				id
			}
		})
	}
}

export default PostServices;