import * as React from "react";
import ReactDOM from "react-dom";

import {
  Tooltip,
  Icon,
  Intent,
  ITreeNode,
  Position,
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


class App extends React.Component {
  render() {
    return (

      <div className="app-container">
  <header>Header</header>

  <main>
    <div className="panel panel-left">
        <DirectoryTree
          className="my-custom-class"
          selectOnClick={false}
          allowMultiSelect={false}
          expandCollapseOnClick={true}
          nodes={dirTreeNodes}
        />
        <DirectoryTree
          className="my-custom-class"
          selectOnClick={false}
          allowMultiSelect={false}
          expandCollapseOnClick={true}
          nodes={dirTreeNodes}
        />
    </div>

    <div className="panel panel-middle">
    </div>

    <div className="panel panel-right">
    </div>

  </main>

  <footer>Footer</footer>
</div> // app-container

        
    );
  }
}

const a = document.createElement("div");
document.body.appendChild(a);
ReactDOM.render(<App />, a);
