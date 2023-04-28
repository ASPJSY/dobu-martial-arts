
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import MembershipCard from "~/components/membershipCard";
import invariant from "tiny-invariant"
import { 
  getMemberships,
  updateUserMembership,
} from "~/models/membership.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";


export const loader = async ({ request }: LoaderArgs) => {
  await requireUserId(request);

  return json({ memberships: await getMemberships() });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const membershipId = formData.get("memberships");
  const userId = formData.get("userId");

invariant(
    typeof membershipId === "string",
    "membershipId must be present and a string value"
  );
  invariant(
    typeof userId === "string",
    "userId must be present and a string value"
  );

  await updateUserMembership({ userId, membershipId });
  console.log({ membershipId, userId });

  return null;
}
export default function Memberships() {
  const { memberships } = useLoaderData<typeof loader>();

  const user = useUser();
  const submit =useSubmit();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
submit(event.currentTarget, { replace: true});

    console.log(`Form chnaged!`)
  }
  console.log({ memberships });

  return (
    <div className="min-h-screen bg-amber-200 p-4">
      <h1 className="mb-4 text-center font-serif text-4xl font-extrabold text-red-900">
        Memberships
      </h1>
      <Form method="post" onChange={(event) => handleChange(event)}>
        <ul className="mx-auto max-w-xl p-4">
          {memberships.map(({ id, level, description, price }) => (
              <MembershipCard
              key={id}
              userMembershipId={user.membershipId}
              userId={user.id}
              membershipId={id}
                level={level}
                description={description}
                price={price}
              />
            ))}
        </ul>
      </Form>
    </div>
  );
}
