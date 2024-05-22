import React, { useState } from "react";
import styled from "styled-components";
import { Color, Typography } from "../../styles";
import { Icon, type IconName } from "../icon";

export enum InsertAreaSize {
  SMALL,
  LARGE,
}
interface Props {
  onClick?: () => void;
  label?: string;
  icon?: IconName;
  onFileDrop?: (files: Array<File>) => void;
  onDataDrop?: (data: string) => void;
  size?: InsertAreaSize;
}

export const InsertArea: React.FunctionComponent<Props> = ({
  onClick,
  label = "",
  icon,
  onFileDrop,
  onDataDrop,
  size = InsertAreaSize.LARGE,
}) => {
  const [inDropzone, setInDropzone] = useState<boolean>(false);

  const handleDragDrop: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inDropzone) {
      onFileDrop?.([...e.dataTransfer.files]);
      onDataDrop?.(e.dataTransfer.getData("text"));
      e.dataTransfer.clearData();
    }
  };

  const handleDragEnter: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setInDropzone(true);
  };

  const handleDragOver: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.dataTransfer.dropEffect = "none";
    setInDropzone(false);
  };

  return (
    <Container
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
      onClick={onClick}
      size={size}
      type="button"
    >
      {icon && (
        <Icon name={icon} color={Color.BRAND_800} size={size === InsertAreaSize.LARGE ? 24 : 16} />
      )}
      {label}
    </Container>
  );
};

const Container = styled.button<{ size: InsertAreaSize }>`
  background-color: transparent;
  color: ${Color.BRAND_800};
  ${(props) => (props.size === InsertAreaSize.SMALL ? Typography.LABEL_2 : Typography.SUBHEAD_1)};
  border-radius: 8px;
  border: 1px dashed ${Color.BRAND_800};
  height: 100%;
  min-height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  padding: 0 10px;
  &:hover {
    background-color: ${Color.BRAND_100};
  }
  transition: 0.15s ease background-color;
`;
