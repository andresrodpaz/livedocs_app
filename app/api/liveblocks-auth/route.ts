import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  // Obtener el usuario actual de Clerk
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;
  
  // Obtener la información del usuario
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress , // Manejo de posibles valores undefined
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  try {
    // Identificar al usuario en Liveblocks
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: user.info.email,
        groupIds: [],
      },
      { userInfo: user.info }
    );

    // Devolver la respuesta
    return new Response(body, { status });
  } catch (error) {
    console.error('Error identifying user in Liveblocks:', error);
    return new Response('Error identifying user', { status: 500 });
  }
}
