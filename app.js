'use strict';
let _ = require('lodash');

let createBoard = function (i) {
    let b = [
        Array(i),
        Array(i),
        Array(i),
        Array(i)
    ];

    b[0][0] = '0';
    for (let k = 1; k < i; k++) {
        b[0][k] = 'a' + (k < 9 ? '0' : '') + (k +  1)
    }

    b[1][0] = '0';
    for (let k = 1; k < i; k++) {
        b[1][k] = 'b' + (k < 9 ? '0' : '') + (k +  1)
    }

    b[2][0] = '0';
    for (let k = 1; k < i; k++) {
        b[2][k] = 'c' + (k < 9 ? '0' : '') + (k +  1)
    }

    b[3][0] = '0';
    for (let k = 1; k < i; k++) {
        b[3][k] = 'd' + (k < 9 ? '0' : '') + (k +  1)
    }

    return b;
};

let shuffleBoard = function (b) {
    let i1 = -1,
        i2 = -1,
        i3 = -1,
        i4 = -1,
        c = [];

    if (b[0][0] == 'a02') {
        i1 = 0;
        while (b[0][i1 + 1] == followCard(b[0][i1])) {
            i1++;
        }
    }
    if (b[1][0] == 'b02') {
        i2 = 0;
        while (b[1][i2 + 1] == followCard(b[1][i2])) {
            i2++;
        }
    }
    if (b[2][0] == 'c02') {
        i3 = 0;
        while (b[2][i3 + 1] == followCard(b[2][i3])) {
            i3++;
        }
    }
    if (b[3][0] == 'd02') {
        i4 = 0;
        while (b[3][i4 + 1] == followCard(b[3][i4])) {
            i4++;
        }
    }

    for (let i = i1 + 1; i < b[0].length; i++) {
        c.push(b[0][i]);
    }
    for (let i = i2 + 1; i < b[1].length; i++) {
        c.push(b[1][i]);
    }
    for (let i = i3 + 1; i < b[2].length; i++) {
        c.push(b[2][i]);
    }
    for (let i = i4 + 1; i < b[3].length; i++) {
        c.push(b[3][i]);
    }

    _.pull(c, '0');
    c = _.shuffle(c);

    b[0][i1 + 1] = '0';
    for (let i = i1 + 2; i < b[0].length; i++) {
        b[0][i] = c[0];
        c = _.drop(c);
    }
    b[1][i2 + 1] = '0';
    for (let i = i2 + 2; i < b[1].length; i++) {
        b[1][i] = c[0];
        c = _.drop(c);
    }
    b[2][i3 + 1] = '0';
    for (let i = i3 + 2; i < b[2].length; i++) {
        b[2][i] = c[0];
        c = _.drop(c);
    }
    b[3][i4 + 1] = '0';
    for (let i = i4 + 2; i < b[3].length; i++) {
        b[3][i] = c[0];
        c = _.drop(c);
    }
};

let printBoard = function (b) {
    let s = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < b[i].length; j++) {
            s += b[i][j];
            s += '\t';
        }
        s += '\n';
    }
    console.log(s);
};

let isKing = function (c) {
    return c.substr(1, 2) == '13'
};

let checkRow = function (b, n1, n2) {
    let a = true,
        c = (n1 == 0 ? 'a' : n1 == 1 ? 'b' : n1 == 2 ? 'c' : 'd');
    if (a && n2 > 0) {
        a = b[n1][0] == c + '02';
    }
    if (a && n2 > 1) {
        a = b[n1][1] == c + '03';
    }
    if (a && n2 > 2) {
        a = b[n1][2] == c + '04';
    }
    if (a && n2 > 3) {
        a = b[n1][3] == c + '05';
    }
    if (a && n2 > 4) {
        a = b[n1][4] == c + '06';
    }
    if (a && n2 > 5) {
        a = b[n1][5] == c + '07';
    }
    if (a && n2 > 6) {
        a = b[n1][6] == c + '08';
    }
    if (a && n2 > 7) {
        a = b[n1][7] == c + '09';
    }
    if (a && n2 > 8) {
        a = b[n1][8] == c + '10';
    }
    if (a && n2 > 9) {
        a = b[n1][9] == c + '11';
    }
    if (a && n2 > 10) {
        a = b[n1][10] == c + '12';
    }
    if (a && n2 > 11) {
        a = b[n1][11] == c + '13';
    }
    return a;
};

let checkBoard = function (b) {
    let a = [
        ['a02', 'a03', 'a04', 'a05', 'a06', 'a07', 'a08', 'a09', 'a10', 'a11', 'a12', 'a13', '0'],
        ['b02', 'b03', 'b04', 'b05', 'b06', 'b07', 'b08', 'b09', 'b10', 'b11', 'b12', 'b13', '0'],
        ['c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13', '0'],
        ['d02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13', '0']
    ];
    return _.isEqual(a, b);
};

let findFree = function (b, i) {
    let k = 0;

    for (let i1 = 0; i1 < 4; i1++) {
        for (let i2 = 0; i2 < 13; i2++) {
            if (b[i1][i2] == '0') {
                k++;
            }
            if (k == i) {
                return [i1, i2];
            }
        }
    }
};

let findCard = function (b, c) {
    for (let i1 = 0; i1 < 4; i1++) {
        for (let i2 = 0; i2 < 13; i2++) {
            if (b[i1][i2] == c) {
                return [i1, i2];
            }
        }
    }
};

let followCard = function (c) {
    switch (c.substr(1, 2)) {
        case '02': {
            return c.substr(0, 1) + '03';
        }
        case '03': {
            return c.substr(0, 1) + '04';
        }
        case '04': {
            return c.substr(0, 1) + '05';
        }
        case '05': {
            return c.substr(0, 1) + '06';
        }
        case '06': {
            return c.substr(0, 1) + '07';
        }
        case '07': {
            return c.substr(0, 1) + '08';
        }
        case '08': {
            return c.substr(0, 1) + '09';
        }
        case '09': {
            return c.substr(0, 1) + '10';
        }
        case '10': {
            return c.substr(0, 1) + '11';
        }
        case '11': {
            return c.substr(0, 1) + '12';
        }
        case '12': {
            return c.substr(0, 1) + '13';
        }
        default: {
            return null;
        }
    }
};

let makeOneMove = function (b, i1, i2) {
    let i;
    if (i2 == 0) {
        i = findCard(b, (i1 == 0 ? 'a' : i1 == 1 ? 'b' : i1 == 2 ? 'c' : 'd') + '02');
    } else {
        i = findCard(b, followCard(b[i1][i2 - 1]));
    }
    b[i1][i2] = b[i[0]][i[1]];
    b[i[0]][i[1]] = '0';
    return i;
};

let tryMove = function (b, k, l) {
    let bc = JSON.parse(JSON.stringify(b));
    let i = findFree(bc, k);
    for (let j = l; j > 0; j--) {
        if (i[1] - j > 0) {
            if (isKing(bc[i[0]][i[1] - j - 1])) {
                return false;
            }
        }
        makeOneMove(bc, i[0], i[1] - j);
        if (isKing(bc[i[0]][i[1] - j])) {
            return false;
        }
    }
    if (i[1] > 0) {
        if (bc[i[0]][i[1] - 1] == '0' || isKing(bc[i[0]][i[1] - 1])) {
            return false;
        }
    }
    // printBoard(bc);
    while (true) {
        i = makeOneMove(bc, i[0], i[1]);
        // printBoard(bc);
        if (bc[i[0]][i[1] - 1] == '0') {
            if (i[1] == 1) {
                return 1;
            }
            if (bc[i[0]][i[1] - 2] == '0') {
                if (i[1] == 2) {
                    return 1;
                }
                if (bc[i[0]][i[1] - 3] == '0') {
                    if (i[1] == 3) {
                        return 1;
                    }
                    if (isKing(bc[i[0]][i[1] - 4])) {
                        return 0;
                    }
                    return (checkRow(bc, i[0], i[1] - 3) ? 1 : 2);
                }
                if (isKing(bc[i[0]][i[1] - 3])) {
                    return 0;
                }
                return (checkRow(bc, i[0], i[1] - 2) ? 1 : 2);
            }
            if (isKing(bc[i[0]][i[1] - 2])) {
                return 0;
            }
            return (checkRow(bc, i[0], i[1] - 1) ? 1 : 2);
        }
        if (isKing(bc[i[0]][i[1] - 1])) {
            return 0;
        }
        if (checkRow(bc, i[0], i[1])) {
            return 1;
        }
    }
};

let makeMove = function (b, k, l) {
    let i = findFree(b, k);
    for (let j = l; j > 0; j--) {
        makeOneMove(b, i[0], i[1] - j);
    }
    while (true) {
        i = makeOneMove(b, i[0], i[1]);
        if (b[i[0]][i[1] - 1] == '0') {
            return;
        }
        if (checkRow(b, i[0], i[1])) {
            return;
        }
    }
};

let game = function (b) {
    // b = [
    //     ['a2', 'a3', 'a4', 'a7', 'a8', 'a9', 'a10', 'aJ', 'dQ', 'dK', 'b8', 'b9', '0'],
    //     ['b2', 'b3', 'b4', 'b5', 'b6', 'b7', '0', 'cK', 'a6', 'dJ', 'aK', 'b10', 'bJ'],
    //     ['c2', 'c3', 'c4', 'd3', 'd4', 'd5', 'c5', 'c6', 'c7', 'd6', 'bQ', 'bK', '0'],
    //     ['d2', '0', 'c8', 'c9', 'c10', 'cJ', 'cQ', 'aQ', 'd7', 'd8', 'd9', 'd10', 'a5'],
    // ];
    // printBoard(b);
    let a = true;
    while (a) {
        a = false;
        if (!a) {
            if (tryMove(b, 1, 0) == 1) {
                makeMove(b, 1, 0);
                a = true;
                // console.log(1);
            }
        }
        if (!a) {
            if (tryMove(b, 2, 0) == 1) {
                makeMove(b, 2, 0);
                a = true;
                // console.log(2);
            }
        }
        if (!a) {
            if (tryMove(b, 3, 0) == 1) {
                makeMove(b, 3, 0);
                a = true;
                // console.log(3);
            }
        }
        if (!a) {
            if (tryMove(b, 4, 0) == 1) {
                makeMove(b, 4, 0);
                a = true;
                // console.log(4);
            }
        }
        if (!a) {
            let i = findFree(b, 2);
            if (i[1] > 0) {
                if (b[i[0]][i[1] - 1] == '0') {
                    if (tryMove(b, 2, 1) == 1) {
                        makeMove(b, 2, 1);
                        a = true;
                        // console.log(5);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 3);
            if (i[1] == 1) {
                if (b[i[0]][i[1] - 1] == '0') {
                    if (tryMove(b, 3, 1) == 1) {
                        makeMove(b, 3, 1);
                        a = true;
                        // console.log(6);
                    }
                }
            } else if (i[1] > 1) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] != '0') {
                    if (tryMove(b, 3, 1) == 1) {
                        makeMove(b, 3, 1);
                        a = true;
                        // console.log(6);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 4);
            if (i[1] == 1) {
                if (b[i[0]][i[1] - 1] == '0') {
                    if (tryMove(b, 4, 1) == 1) {
                        makeMove(b, 4, 1);
                        a = true;
                        // console.log(7);
                    }
                }
            } else if (i[1] > 1) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] != '0') {
                    if (tryMove(b, 4, 1) == 1) {
                        makeMove(b, 4, 1);
                        a = true;
                        // console.log(7);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 3);
            if (i[1] > 1) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0') {
                    if (tryMove(b, 3, 2) == 1) {
                        makeMove(b, 3, 2);
                        a = true;
                        // console.log(8);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 4);
            if (i[1] == 2) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0') {
                    if (tryMove(b, 4, 2) == 1) {
                        makeMove(b, 4, 2);
                        a = true;
                        // console.log(9);
                    }
                }
            } else if (i[1] > 2) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0' && b[i[0]][i[1] - 3] != '0') {
                    if (tryMove(b, 4, 2) == 1) {
                        makeMove(b, 4, 2);
                        a = true;
                        // console.log(9);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 4);
            if (i[1] > 2) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0' && b[i[0]][i[1] - 3] == '0') {
                    if (tryMove(b, 4, 3) == 1) {
                        makeMove(b, 4, 3);
                        a = true;
                        // console.log(10);
                    }
                }
            }
        }
        if (!a) {
            if (tryMove(b, 1, 0) == 2) {
                makeMove(b, 1, 0);
                a = true;
                // console.log(11);
            }
        }
        if (!a) {
            if (tryMove(b, 2, 0) == 2) {
                makeMove(b, 2, 0);
                a = true;
                // console.log(12);
            }
        }
        if (!a) {
            if (tryMove(b, 3, 0) == 2) {
                makeMove(b, 3, 0);
                a = true;
                // console.log(13);
            }
        }
        if (!a) {
            if (tryMove(b, 4, 0) == 2) {
                makeMove(b, 4, 0);
                a = true;
                // console.log(14);
            }
        }
        if (!a) {
            let i = findFree(b, 2);
            if (i[1] > 0) {
                if (b[i[0]][i[1] - 1] == '0') {
                    if (tryMove(b, 2, 1) == 2) {
                        makeMove(b, 2, 1);
                        a = true;
                        // console.log(15);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 3);
            if (i[1] == 1) {
                if (b[i[0]][i[1] - 1] == '0') {
                    if (tryMove(b, 3, 1) == 2) {
                        makeMove(b, 3, 1);
                        a = true;
                        // console.log(16);
                    }
                }
            } else if (i[1] > 1) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] != '0') {
                    if (tryMove(b, 3, 1) == 2) {
                        makeMove(b, 3, 1);
                        a = true;
                        // console.log(16);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 4);
            if (i[1] == 1) {
                if (b[i[0]][i[1] - 1] == '0') {
                    if (tryMove(b, 4, 1) == 2) {
                        makeMove(b, 4, 1);
                        a = true;
                        // console.log(17);
                    }
                }
            } else if (i[1] > 1) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] != '0') {
                    if (tryMove(b, 4, 1) == 2) {
                        makeMove(b, 4, 1);
                        a = true;
                        // console.log(17);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 3);
            if (i[1] > 1) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0') {
                    if (tryMove(b, 3, 2) == 2) {
                        makeMove(b, 3, 2);
                        a = true;
                        // console.log(18);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 4);
            if (i[1] == 2) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0') {
                    if (tryMove(b, 4, 2) == 2) {
                        makeMove(b, 4, 2);
                        a = true;
                        // console.log(19);
                    }
                }
            } else if (i[1] > 2) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0' && b[i[0]][i[1] - 3] != '0') {
                    if (tryMove(b, 4, 2) == 2) {
                        makeMove(b, 4, 2);
                        a = true;
                        // console.log(19);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 4);
            if (i[1] > 2) {
                if (b[i[0]][i[1] - 1] == '0' && b[i[0]][i[1] - 2] == '0' && b[i[0]][i[1] - 3] == '0') {
                    if (tryMove(b, 4, 3) == 2) {
                        makeMove(b, 4, 3);
                        a = true;
                        // console.log(20);
                    }
                }
            }
        }
        if (!a) {
            let i = findFree(b, 1);
            if (i[1] > 0) {
                if (b[i[0]][i[1] - 1] != '0' && !isKing(b[i[0]][i[1] - 1])) {
                    makeOneMove(b, i[0], i[1]);
                    a = true;
                }
            } else {
                makeOneMove(b, i[0], i[1]);
            }
        }
        if (!a) {
            let i = findFree(b, 2);
            if (i[1] > 0) {
                if (b[i[0]][i[1] - 1] != '0' && !isKing(b[i[0]][i[1] - 1])) {
                    makeOneMove(b, i[0], i[1]);
                    a = true;
                }
            } else {
                makeOneMove(b, i[0], i[1]);
            }
        }
        if (!a) {
            let i = findFree(b, 3);
            if (i[1] > 0) {
                if (b[i[0]][i[1] - 1] != '0' && !isKing(b[i[0]][i[1] - 1])) {
                    makeOneMove(b, i[0], i[1]);
                    a = true;
                }
            } else {
                makeOneMove(b, i[0], i[1]);
            }
        }
        if (!a) {
            let i = findFree(b, 4);
            if (i[1] > 0) {
                if (b[i[0]][i[1] - 1] != '0' && !isKing(b[i[0]][i[1] - 1])) {
                    makeOneMove(b, i[0], i[1]);
                    a = true;
                }
            } else {
                makeOneMove(b, i[0], i[1]);
            }
        }
        // printBoard(b);
        // console.log('\n');
    }
    // printBoard(b);
};

let fullGame = function() {
    let b = createBoard(),
        k = 0;

    shuffleBoard(b);
    game(b);

    while (!checkBoard(b)) {
        shuffleBoard(b);
        game(b);
        k++;
    }

    return k;
};

// let n = 10000;
// let m = [];
// for (let i = 0; i < n; i++) {
//     m.push(fullGame());
//     console.log((i + 1) + '/' + n);
// }
// let r = _.map(m, (i) => {return (i <= 3 ? 1 : 0)});
// console.log(_.sum(r));
// console.log(_.sum(r) / n);

// Ergebnis: 532.992 von 1.000.000

let b = createBoard(5);
printBoard(b);
shuffleBoard(b);
printBoard(b);