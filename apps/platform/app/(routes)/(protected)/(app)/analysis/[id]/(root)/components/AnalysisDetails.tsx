/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { usePageHeader, usePageName } from "@/app/(routes)/(protected)/(app)/hooks";
import { AnalysisInteractor } from "@/app/interactors";
import { type Analysis, type PartialAnalysis } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  CurrencySegment,
  Icon,
  Segment,
  SegmentedContentBlock,
  SegmentedContentColor,
  SegmentedContentSize,
  SnackbarLevel,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { AnalysisModal } from "../../../(root)/modals";
import { DeleteAnalysisModal } from "../modals";
import { useAnalysisDetailStore } from "../store";

interface Props {
  analysis?: Analysis;
}

export const AnalysisDetails: React.FunctionComponent<Props> = ({ analysis }) => {
  const [editAnalysis, setEditAnalysis] = useState(false);
  const [showAnalysisDeleteModal, setShowAnalysisDeleteModal] = useState(false);
  const { executeStrategy, setExecuteStrategy } = useAnalysisDetailStore();
  const { setPageState, page } = usePageHeader();
  const router = useRouter();
  const pathname = usePathname();
  const analysisId = analysis?.analysisId;
  usePageName(analysisId ?? "", analysis?.name ?? "");

  const { setSnack } = useSnackbarStore();

  // TODO: pull draft/saved from API
  useEffect(() => {
    setPageState({
      saved: true,
      menu: {
        onSelect: (event) => {
          switch (event.key) {
            // case "activity":
            //   const currentPath = pathname;
            //   router.push(`${currentPath}/activity`);
            //   break;

            case "edit":
              setEditAnalysis(true);
              break;

            case "delete":
              if (analysisId) {
                setShowAnalysisDeleteModal(true);
              }
              break;

            default:
              return;
          }
        },
        options: [
          {
            key: "edit",
            value: "Edit",
            icon: "pencil",
          },
          // {
          //   key: "activity",
          //   value: "Activity",
          //   icon: "activity",
          // },
          {
            key: "delete",
            value: "Delete",
            icon: "trash",
            color: Color.DANGER_700,
          },
        ],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router, page]);

  const updateAnalysis = async (analysisId: string, analysisUpdates: PartialAnalysis) => {
    const [response, error] = await AnalysisInteractor.update(analysisId, analysisUpdates);

    if (error) {
      console.error(error);
      setSnack({
        message: "Couldn't update analysis.",
        icon: "x",
        duration: 5,
      });
    }

    if (response) {
      router.refresh();
      setSnack({
        message: "Analysis updated successfully.",
        level: SnackbarLevel.SUCCESS,
        icon: "circle-check",
        duration: 5,
      });
    }
  };

  return (
    <Container>
      {editAnalysis && (
        <AnalysisModal
          analysis={analysis}
          onSave={updateAnalysis}
          onDismiss={() => setEditAnalysis(false)}
        />
      )}
      {analysis && (
        <>
          <SegmentedContentBlock
            color={SegmentedContentColor.NEUTRAL_300}
            size={SegmentedContentSize.MEDIUM}
            separated
          >
            <CurrencySegment
              baseFlag={analysis.baseCurrency.countryName}
              label=""
              foreignFlag={analysis.foreignCurrency.countryName}
              baseCurrency={analysis.baseCurrency.code}
              foreignCurrency={analysis.foreignCurrency.code}
            />
            <Segment>
              <Heading>{analysis?.category}</Heading>
              <Para>Category</Para>
            </Segment>
            {analysis?.organization && (
              <Segment>
                <SegmentContainer>
                  <Heading>{analysis.organization}</Heading>
                  <Icon name={"chevron-right"} color={Color.NEUTRAL_900} />
                </SegmentContainer>
                <Para>Organization</Para>
              </Segment>
            )}
          </SegmentedContentBlock>
        </>
      )}
      {showAnalysisDeleteModal && analysisId && (
        <DeleteAnalysisModal
          onDismiss={() => setShowAnalysisDeleteModal(false)}
          analysis={analysis}
        />
      )}

      <Flex>
        {executeStrategy && (
          <Span>
            <Button
              label={"Cancel"}
              resizeMode="fit"
              type={1}
              onClick={() => {
                setExecuteStrategy(false);
              }}
            />
          </Span>
        )}
        <Button
          label={"Execute Strategies"}
          resizeMode="fit"
          onClick={() => {
            setExecuteStrategy(true);
          }}
        />
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
`;

const Span = styled.span`
  margin-right: 12px;
`;

const Heading = styled.p`
  ${Typography.SUBHEAD_3}
`;

const Para = styled.p`
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_3}
`;

const SegmentContainer = styled.div`
  display: flex;
  justify-content: start;
`;
