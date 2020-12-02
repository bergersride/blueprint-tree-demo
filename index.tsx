import * as React from "react";
import ReactDOM from 'react-dom';

import { Tooltip, Icon, Intent, Tree, ITreeNode, Button, ButtonGroup, Popover, Position, Menu, Classes} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css"
import { TreeExample } from "./TreeExample";
import "./styles.scss";


type MenuItem = {
    text: string,
    onClick: (e)=>any,
  } & any;

export type Props = {
  items: Array<'divider' | MenuItem>,
  commonButtonProps?: any,
  arrowButtonProps?: any,
  actionButtonProps?: any
}

export type State = {
  item: MenuItem
}

class DropdownButton extends React.Component<Props, State> {

  constructor(props){
    super(props);
    this.state = {item:props.items[0]};
  }
  componentWillMount(){
    const {items} = this.props;  
  }

  clickItem = (e, item: MenuItem, index:number) => {
    this.setState({item});
    item.onClick(e);
  }

  renderMenu = () => {
    const {items} = this.props;
    return <Menu className="dropdown_button_body"> {items.map((item, index) => {
        if(item==='divider'){
          return <Menu.Divider key={index}/>
        } else {
          return <Menu.Item {...item} onClick={(e)=>this.clickItem(e, item, index)} key={index}/>
        }
      })}
    </Menu>
  }


  render(){
    const {commonButtonProps, arrowButtonProps, actionButtonProps} = this.props;
    const {icon, text} = this.state.item;
    return <Popover minimal position={Position.BOTTOM_LEFT} content={this.renderMenu()} hasBackdrop>
        <div className="dropdown_button">
          <ButtonGroup fill>
            <Button
              {...commonButtonProps}
              {...actionButtonProps}
              className="dropdown_button_button"
              onClick={(e)=>{
                e.stopPropagation();
                this.state.item.onClick(e);
              }}
              {...{icon, text}}
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
  }

}

class App extends React.Component{

  render (){
    return <div>

                <TreeExample
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
  }
}


const a = document.createElement('div');
document.body.appendChild(a);
ReactDOM.render(<App/>, a);