import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const result = await prisma.user.create({
  //   data:{
  //     name:"sazid",
  //     email:"sazid@gmail.com"
  //   }
  // })
  // console.log(result)
  // const usersData = await prisma.user.findMany({
  //   where:{
  //     name:"munna"
  //   }
  // })
  // console.log(usersData)

  const findUserById = await prisma.user.findUniqueOrThrow({
    where: {
      id: 6,
    },
  });
  console.log(findUserById);
}

main();
