import * as React from "react";

export interface HeaderProps {

}

const Header: React.FC<HeaderProps> = (props) => {
  console.log('render header')

  return (
    <div>
      Header
    </div>
  )
}

export default Header