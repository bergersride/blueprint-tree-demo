import * as React from "react";
import ReactDOM from "react-dom";

import {
  Tooltip,
  Icon,
  Intent,
  Tree,
  ITreeNode,
  Button,
  ButtonGroup,
  Popover,
  Position,
  Menu,
  Classes
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { DirectoryTree } from "./Components/DirectoryTree";
import "./styles.scss";

let dirTreeNodes: ITreeNode[] = [
  {
    id: 0,
    hasCaret: true,
    icon: "folder-close",
    isExpanded: false,
    label: "Folder 0",
    secondaryLabel: "Secondary"
  },
  {
    id: 1,
    hasCaret: true,
    icon: "folder-open",
    isExpanded: true,
    label: (
      <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
        Folder 1
      </Tooltip>
    ),
    childNodes: [
      {
        id: 2,
        icon: "document",
        label: "Item 0",
        secondaryLabel: (
          <Tooltip content="An eye!">
            <Icon icon="eye-open" />
          </Tooltip>
        )
      },
      {
        id: 3,
        icon: (
          <Icon
            icon="tag"
            intent={Intent.PRIMARY}
            className={Classes.TREE_NODE_ICON}
          />
        ),
        label:
          "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man."
      },
      {
        id: 4,
        hasCaret: true,
        icon: "folder-close",
        label: (
          <Tooltip content="foo" position={Position.RIGHT}>
            Folder 2
          </Tooltip>
        ),
        childNodes: [
          { id: 5, label: "No-Icon Item" },
          { id: 6, icon: "tag", label: "Item 1" },
          {
            id: 7,
            hasCaret: true,
            icon: "folder-close",
            label: "Folder 3",
            childNodes: [
              { id: 8, icon: "document", label: "Item 0" },
              { id: 9, icon: "media", label: "Item 1" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    hasCaret: true,
    icon: "folder-close",
    label: "Super secret files",
    disabled: true
  }
];

type MenuItem = {
  text: string;
  onClick: (e) => any;
} & any;

export type Props = {
  items: Array<"divider" | MenuItem>;
  commonButtonProps?: any;
  arrowButtonProps?: any;
  actionButtonProps?: any;
};

export type State = {
  item: MenuItem;
};

class DropdownButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { item: props.items[0] };
  }
  componentWillMount() {
    const { items } = this.props;
  }

  clickItem = (e, item: MenuItem, index: number) => {
    this.setState({ item });
    item.onClick(e);
  };

  renderMenu = () => {
    const { items } = this.props;
    return (
      <Menu className="dropdown_button_body">
        {" "}
        {items.map((item, index) => {
          if (item === "divider") {
            return <Menu.Divider key={index} />;
          } else {
            return (
              <Menu.Item
                {...item}
                onClick={e => this.clickItem(e, item, index)}
                key={index}
              />
            );
          }
        })}
      </Menu>
    );
  };

  render() {
    const {
      commonButtonProps,
      arrowButtonProps,
      actionButtonProps
    } = this.props;
    const { icon, text } = this.state.item;
    return (
      <Popover
        minimal
        position={Position.BOTTOM_LEFT}
        content={this.renderMenu()}
        hasBackdrop
      >
        <div className="dropdown_button">
          <ButtonGroup fill>
            <Button
              {...commonButtonProps}
              {...actionButtonProps}
              className="dropdown_button_button"
              onClick={e => {
                e.stopPropagation();
                this.state.item.onClick(e);
              }}
              {...{ icon, text }}
            />

            <Button
              {...commonButtonProps}
              {...arrowButtonProps}
              className={`dropdown_button_arrow ${Classes.FIXED}`}
              rightIcon="caret-down"
            />
          </ButtonGroup>
        </div>
      </Popover>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <DirectoryTree
          selectOnClick={false}
          allowMultiSelect={false}
          expandCollapseOnClick={true}
          nodes={dirTreeNodes}
        />

        {/*
      <DropdownButton
        items={[
          {
            text: 'A',
            icon: 'chat',
            onClick: ()=>{
              console.log('Chat');
            }
          },
          {
            text: 'f.',
            icon: 'delete',
            onClick: ()=>{
              console.log('Delete');
            }
          },
          'divider',
          {
            text: 'fd',
            icon: 'add',
            intent: 'success',
            onClick: ()=>{
              console.log('Add');
            }
          }
        ]}/>
        */}
      </div>
    );
  }
}

const a = document.createElement("div");
document.body.appendChild(a);
ReactDOM.render(<App />, a);
