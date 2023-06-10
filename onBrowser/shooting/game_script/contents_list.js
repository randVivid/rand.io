
//弾
const bulletN = {
    single: 0,
    triple: 1,
    single_laser: 2,
    x_laser: 3,
    p_laser: 4,
    wide: 5,
    single_slow: 6,
    none:99,
}
//敵
const enemyN = {
    single: 0,
    triple: 1,
    single_laser: 2,
    x_laser: 3,
    p_laser: 4,
    straight: 5,
    wide: 6,
    shake: 7,
    test: 8
}
//敵のx軸移動方法
const xMoveN={
    basic:0,
    cos8:1,
}
//敵のy軸移動方法
const yMoveN={
    basic:0,
    cos:1,
    cos1f6:2,
}
//出現方法
const posT = {
    cm4: 0,
    cm3: 1,
    cm2: 2,
    cm1: 3,
    c0: 4,
    cp1: 5,
    cp2: 6,
    cp3: 7,
    cp4: 8,
    random: 9,
    test: 10,
}
//アイテムの効果
const itemEfN = {
    heal:0,
    change:1,
}