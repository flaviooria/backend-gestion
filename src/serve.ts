import express, { Application, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { initRouter } from './user/infrastructure/init.route';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

initRouter(app);

//const prisma = new PrismaClient();
//async function main() {
//	try {
//		await prisma.user.delete({
//			where:{
//				id:'11'
//			}
//		})
//	} catch (error:any) {
//		if(error.code == 'P2025'){
//			console.log('no se encontro we')
//		}
//	}
//	return true;
//
//	
//}

export const boostrap = () => {
	app.listen(Number(PORT), '0.0.0.0', () => {
		console.log(`Listen in port ${PORT}`);
	});

	//main()
	//.then(async () => {
	//	await prisma.$disconnect();
	//})
	//.catch(async (e) => {
	//	console.error(e);
	//	await prisma.$disconnect();
	//	process.exit(1);
	//});
};
