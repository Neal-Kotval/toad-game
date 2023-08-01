// pages/brackets.js
import Brackets from '../../components/Bracket/Bracket';
import "../../styles/globals.scss";
import Navbar from '../../components/Navbar/Navbar';

const BracketsPage = () => {
  return (
    <div>
        <Navbar/>
      <Brackets />
    </div>
  );
};

export default BracketsPage;
