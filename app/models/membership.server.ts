import { prisma } from "~/db.server";

export async function getMemberships() {
  return prisma.membership.findMany();
}
interface UpdateUserMembershipArgs {
    userId: string;
    membershipId: string;
  }
  export async function updateUserMembership({
    userId,
    membershipId,
  }: UpdateUserMembershipArgs) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        membershipId,
      },
    });
  }