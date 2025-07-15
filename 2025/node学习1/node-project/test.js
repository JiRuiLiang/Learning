
    // 获取当前为今年的第几周（ISO标准周数）
    const today = new Date();
    const target = new Date(today.valueOf());
    const dayNr = (today.getDay() + 6) % 7; // 转换周一到周日为0-6
    
    // 调整到周四所在的周
    target.setDate(target.getDate() - dayNr + 3);
    
    // 获取当年第一个周四
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    
    // 计算周数差
    const weekNum = 1 + Math.ceil((target - firstThursday) / (7 * 86400000));
    
