export class FriendType  {
    id: number;
    name: string;
};

export type TimeDebtType = Array<{
    amount: number;
    friend: FriendType;
}>;

export type GiverType = Array<{
    amount: number;
    friend: FriendType;
}>;

export type ReceiverType = Array<{
    amount: number;
    friend: FriendType;
}>;

export type ComputedTxns = Array<{
    id: number;
    amount: number | string;
    from_friend: FriendType;
    to_friend: FriendType;
}>;

let lastId = 0;

export const randomId = () => {
    return Math.floor(Math.random() * 1000) + ++lastId;
};