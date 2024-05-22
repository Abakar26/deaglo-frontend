import { useNavigate } from "react-router-dom";
import { type PageHeaderProps } from "view/components/PageHeader";

export const usePageHeader = (): PageHeaderProps => {
  const navigate = useNavigate();

  const user = {
    profile: "G.png",
    logo: "Deaglo.png",
    onClick: () => navigate("/account"),
  };

  return {
    user,
  };
};
