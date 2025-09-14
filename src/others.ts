import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


async function others() {
    
    // const insertUsers= await prisma.user.createMany({
    //     data:[
    //         {
    //             name:"munna",
    //             email:"mualsdkf"
    //         },
    //         {
    //             name:"munna2",
    //             email:"mualsdkf"
    //         },
    //         {
    //             name:"munna3",
    //             email:"mualsdkf"
    //         },
    //         {
    //             name:"munna4",
    //             email:"mualsdkf"
    //         },
    //         {
    //             name:"sazid",
    //             email:"sazid@mail.com"
    //         }
    //     ]
    // })
    // console.log(insertUsers)

    // retrive all data
    const users = await prisma.user.findMany({
        where:{
        email:{
            contains:"Sa", // case sensitive
            mode:"insensitive" // case insensitive
        }
        },
        orderBy:{
            name:'asc'
        }
    })
    console.log(users)
}
others()