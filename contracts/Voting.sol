pragma solidity >=0.4.22 <0.9.0;



contract Voting{
 
    string public nam="Voting Contract";
    uint256 public opinionCount=0;
    mapping(uint=>Opinion) public opinion;
    mapping(address=>bool) voter;

  
    
    struct Opinion{
        uint _id;
        address creator;
        string name;
        string description;
        uint256 upvote;
        uint256 downvote;
         uint  voteEnding;
    }
    
    event eventVote(
        uint indexed _id
        );

        event addOp(
            string name,
            string description
        );
    
    function addOpinion(string memory name, string memory description,uint time) public{
        opinion[opinionCount]=Opinion(opinionCount,msg.sender,name,description,0,0,time);
        opinionCount +=1;
        emit addOp(name,description);
    }
    
    function upVote(uint _id)public{
        // require(!voter[msg.sender]);
        require(opinion[_id].creator!=msg.sender);
        require(_id<=opinionCount);
        // voter[msg.sender]=true;
      
        opinion[_id].upvote++;
        emit eventVote(_id);
        
    }
    
     function downVote(uint _id)public{
         require(opinion[_id].creator!=msg.sender);
        // require(!voter[msg.sender]); 
        require(_id<=opinionCount);
        // voter[msg.sender]=true;
        
        opinion[_id].downvote ++;
        emit eventVote(_id);
    }
}
