import Invite from "../../../../pages/dashboard/Invite";
import InviteLink from "../../../../pages/dashboard/InviteLink";
const depositArea = (prop) => {
  return (
    <>
      <Invite {...prop} />

      <InviteLink {...prop} />
    </>
  );
};

export default depositArea;
