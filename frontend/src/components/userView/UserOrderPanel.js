import {
    Box
} from '@chakra-ui/react';
import React from "react";

export default function UserOrderPanel() {
    return (
        <Box>
            <p>购买书籍后，生成订单，展示给用户，并将订单存入数据库</p>
            <p>顾客可以查看自己的所有订单，并且可以使用搜索功能来实现过滤，具体可以按照时间范围或书籍名称过滤</p>
        </Box>
    );
}