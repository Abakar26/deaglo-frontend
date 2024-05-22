import LinkButton from "ui/components/LinkButton";
import MainContainer from "ui/components/MainContainer";

const FWDEfficiencyPage = () => {
  return (
    <MainContainer title="Forward Efficiency">
      <LinkButton to="/market/fwd-efficiency/simulation/45" text="Saved Analysis" />
    </MainContainer>
  );
};

export default FWDEfficiencyPage;
