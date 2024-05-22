"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, FilterDropdown } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Activity {
  analysisName: string;
  userName: string;
  pictureUrl: string;
  credentials: string;
  date: string;
  time: string;
  action: string;
  simulationType: string;
}

const ActivityData = [
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/09",
    time: "12:30 PM",
    action: "ran",
    simulationType: "Strategy Simulation",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Markus",
    pictureUrl: "",
    credentials: "MK",
    date: "2023/03/09",
    time: "12:30 PM",
    action: "ran",
    simulationType: "Margin Simulation",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Markus",
    pictureUrl: "",
    credentials: "MK",
    date: "2023/03/09",
    time: "12:30 PM",
    action: "edit",
    simulationType: "Strategy Simulation",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/09",
    time: "12:30 PM",
    action: "delete",
    simulationType: "Strategy Simulation",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/08",
    time: "12:30 PM",
    action: "create",
    simulationType: "",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/08",
    time: "12:30 PM",
    action: "ran",
    simulationType: "Hedge IRR",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/08",
    time: "12:30 PM",
    action: "ran",
    simulationType: "Strategy Simulation",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/08",
    time: "12:30 PM",
    action: "ran",
    simulationType: "Strategy Simulation",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/06",
    time: "12:30 PM",
    action: "create",
    simulationType: "",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/06",
    time: "12:30 PM",
    action: "ran",
    simulationType: "Hedge IRR",
  },
  {
    analysisName: "IG4 Analysis 2 EUR-BRL",
    userName: "Daniel",
    pictureUrl: "https://revolutionexecutivesearch.com/wp-content/uploads/2022/11/bnr-img.jpg",
    credentials: "DS",
    date: "2023/03/06",
    time: "12:30 PM",
    action: "ran",
    simulationType: "Strategy Simulation",
  },
];

const groupByDate = (activities: Activity[]) => {
  return activities.reduce((grouped: Record<string, Activity[]>, activity) => {
    (grouped[activity.date] = grouped[activity.date] ?? []).push(activity);
    return grouped;
  }, {});
};

export const AnalysisActivity: React.FunctionComponent = () => {
  const [activitiesGroupedByDate, setActivitiesGroupedByDate] = useState<
    Record<string, Activity[]>
  >({});

  useEffect(() => {
    const grouped = groupByDate(ActivityData);
    setActivitiesGroupedByDate(grouped);
  }, []);

  return (
    <Card hoverable>
      <FilterContainer>
        <FilterText>Filter by</FilterText>
        <FilterDropdown filter="All Users" active={[]} onSelect={() => null} options={[]} />
        <FilterDropdown filter="Date" active={[]} onSelect={() => null} options={[]} />
      </FilterContainer>
      {Object.entries(activitiesGroupedByDate).map(([date, activities]) => (
        <div key={date}>
          <DateContainer>
            <Date>{date}</Date>
          </DateContainer>
          {activities.map((activity, index) => (
            <ActivityContainer key={index}>
              <ActivityRow>
                <Profile>
                  {activity.pictureUrl.length === 0 ? (
                    <Credentials>{activity.credentials}</Credentials>
                  ) : (
                    <Image src={activity.pictureUrl} alt={activity.credentials} />
                  )}
                </Profile>
                <NormalText>
                  {activity.userName} {activity.action}{" "}
                  <ColoredText>{activity.simulationType}</ColoredText>
                  {activity.action === "create" ? " " : " in "}
                  <ColoredText>{activity.analysisName}</ColoredText>
                </NormalText>
              </ActivityRow>
              <ActivityColumn>
                <Time>{activity.time}</Time>
              </ActivityColumn>
            </ActivityContainer>
          ))}
        </div>
      ))}
    </Card>
  );
};

const Time = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Date = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const DateContainer = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const ColoredText = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.BRAND_800};
`;

const FilterText = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
`;

const NormalText = styled.span`
  ${Typography.BODY_1};
  color: ${Color.NEUTRAL_900};
`;

const Credentials = styled.span`
  ${Typography.LABEL_4};
  color: ${Color.TEAL_700};
  width: 20px;
  height: 16px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Profile = styled.div`
  position: relative;
  height: 32px;
  width: 32px;
  border-radius: 9999px;
  border: 1px solid ${Color.NEUTRAL_300};
  background-color: ${Color.TEAL_100};
  margin-right: 8px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const ActivityRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
`;

const ActivityColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
