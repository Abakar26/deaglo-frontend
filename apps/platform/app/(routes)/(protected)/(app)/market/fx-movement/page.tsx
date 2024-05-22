import LinkButton from "ui/components/LinkButton";
import MainContainer from "ui/components/MainContainer";

const FXMovementPage = () => {
  return (
    <MainContainer title="FX Movement">
      <LinkButton to="/market/fx-movement/manage-currencies" text="Manage Currencies" />
    </MainContainer>
  );
};

export default FXMovementPage;
