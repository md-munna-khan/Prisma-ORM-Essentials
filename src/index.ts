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
  // const usersData = await prisma.user.findMany()
  // console.log(usersData)

  // const findUserById = await prisma.user.findUniqueOrThrow({
  //   where: {
  //     id: 6,
  //   },
  // });
  // console.log(findUserById);

  // update user data

// const updateUser = await prisma.user.update({
//   where:{
//     id:1
//   },
//   data:{
//     name:"masud",
//     email:"masud@gmail.com"
//   }
// })
// console.log(updateUser)

// const updatedProfilePhoto = await prisma.user.updateManyAndReturn({
//   where:{
//     profilePhoto:null
//   },
//   data:{
//   profilePhoto:"\\hret4ret45645765765876"
//   }
// })
// console.log(updatedProfilePhoto)

// delete user
// const deleteUser = await prisma.user.deleteMany({
//   where:{
//     id:{
//       lt:3
//     }
//   }

// })
// console.log(deleteUser)


}

main();
