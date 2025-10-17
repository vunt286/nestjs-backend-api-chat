// dto/friend-respond.dto.ts
export class FriendRespondDto {
    requesterId: string;   // người gửi lời mời
    recipientId: string;   // người nhận
    action: 'accept' | 'reject';
  }


//   {"requesterId":"68f23e4564025e7d61c538d0","recipientId":"68f2400d64025e7d61c538d7","action":"accept"}
//   {
//   requester: '68f23e4564025e7d61c538d0',
//   recipient: '68f2400d64025e7d61c538d7',
//   status: 'pending'
// }