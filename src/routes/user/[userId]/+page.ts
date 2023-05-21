import type { User } from "../../../types/user";


export async function load({ params }: { params: { userId: string } }) {
    const userRes = await fetch(`https://admin.dev.orcam.io/api/v8/users/${params.userId}`,
        { headers: { Authorization: 'accessKey d5797433-f9e0-4c83-aba4-58cd1e3bab4a' } })

    if (userRes.status === 200) {
        const user: User = await userRes.json();
        return { user };
    }
    else {
        return { user: null }
    }

}