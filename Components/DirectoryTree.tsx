import * as React from "react";

import {
  Classes,
  Icon,
  Intent,
  ITreeNode,
  Position,
  Tooltip,
  Tree
} from "@blueprintjs/core";

interface IDirectoryTreeState {
  nodes: ITreeNode[];
}

export interface IDirectoryTreeProps {
  selectOnClick: boolean;
  allowMultiSelect: boolean;
  expandCollapseOnClick: boolean;
  nodes: ITreeNode[];
}

export class DirectoryTree extends React.Component<
  IDirectoryTreeProps,
  IDirectoryTreeState
> {
  constructor(props: IDirectoryTreeProps) {
    super(props);
  
    this.state = { nodes: this.props.nodes };
  }

  public render() {
    return (
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
          className={Classes.ELEVATION_0}
        />
    );
  }

  private handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (this.props.selectOnClick) {
      const originallySelected = nodeData.isSelected;
      if (this.props.allowMultiSelect && !e.shiftKey) {
        this.forEachNode(this.state.nodes, n => (n.isSelected = false));
      }
      nodeData.isSelected =
        originallySelected == null ? true : !originallySelected;
      this.setState(this.state);
    } else if (this.props.expandCollapseOnClick) {
      if (nodeData.isExpanded) {
        this.handleNodeCollapse(nodeData);
      } else {
        this.handleNodeExpand(nodeData);
      }
    }
  };

  private handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    if (nodeData.hasCaret) {
      nodeData.icon = "folder-close";
    }
    this.setState(this.state);
  };

  private handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    if (nodeData.hasCaret) {
      nodeData.icon = "folder-open";
    }
    this.setState(this.state);
  };

  private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }
}
