
(() => {
    // 水桶问题
    // target => 3 base 5 ,6
    // target => 5-3 √ 6-3 ×
    // target => 5-2 × 6-2 √
    // target => 5-4 √ 6-4 ×
    // target => 5-1 × 6-1 √
    // target => 5-5 = 0
    // ...
    enum TOOL {
        BUCKET1,
        BUCKET2
    }
    // type Plan = { target: number, tool?: TOOL }
    // function getPlan(target: number, base: [number, number], planList: Plan[], tool?: TOOL): Plan[] {
    //     planList.unshift({target, tool});
    //     base.forEach((bean, index) => {
    //         // 子问题
    //         const nextTarget: number = bean - target;
    //         if (nextTarget === 0) {
    //             planList.unshift({target: bean, tool: index})
    //         } else if (!planList.some(_plan => _plan.target === nextTarget)) {
    //             planList = getPlan(nextTarget, base, planList, index);
    //         } else {
    //             // 死路 循环
    //         }
    //     })
    //     return planList;
    // }
    // const _planList: Plan[] = getPlan(4, [8, 9], []);
    // console.log(_planList)
    // _planList.forEach(_plan => {
    //     console.log(`使用容器${TOOL[_plan.tool]}装${_plan.target}升水`);
    // })

    type Bucket = {
        index: BUCKET,
        max: number,
        statu?: number
    }
    enum BUCKET {
        BUCKET1,
        BUCKET2,
        BUCKETINF = -1
    }
    // type Action = {
    //     from: Bucket,
    //     to: Bucket,
    //     readonly out: number,
    //     readonly rest: number
    // }
    type Plan = {
        target: number,
        tool?: TOOL
    }
    class Action {
        readonly out: number
        readonly rest: number
        constructor(public from: Bucket, public to: Bucket) {
            console.log(`From ${BUCKET[from.index]} have ${from.statu}`)
            console.log(`翻译：桶${BUCKET[from.index]}，拥有${from.statu}升水`)
            console.log(`To ${BUCKET[to.index]} have ${to.statu}`)
            console.log(`翻译：桶${BUCKET[to.index]}，拥有${to.statu}升水`)
            // if Bucket target take all water
            if (to.max - to.statu >= from.statu || to.max == Infinity) {
                this.out = from.statu;
                this.rest = 0;
            } else if (to.max - to.statu < from.statu) {// if Bucket target take some of water
                this.out = to.max - to.statu;
                this.rest = from.statu - this.out;
            }
            // change the Bucket statu
            this.from.statu = this.rest;
            this.to.statu += this.out;
            console.log(`${BUCKET[from.index]} out ${this.out} and rest ${this.rest}`)
            console.log(`翻译：从桶${BUCKET[from.index]}倒出${this.out}升水，当前剩余${this.rest}升水。`)
        }
    }
    // HOW TO slove puzzle
    // make target and if target equal Bucket.rest, puzzle sloved
    // get the finally target LIKE [4]
    // statu of TWO Bucket look like 0, 8, 4 OR 1, 9, 4
    // SO, NEXT target is make [0, 8, 4] OR [1, 9, 4]
    // we can out to other Bucket like [0, 8, 8-4] OUT [4] OR [1, 9, 9-5] OUT [5]
    // SO, TARGET [4] is appear BEFOE, we SHUTDOWN ths way
    // NEXT TARGET is [5], we can't get resolve from BUCKET2
    // because THIS puzzle is frome BUCKET2
    // ONLY one way to SOLVE IT [0, 8, (8-5)]
    // NEXT TARGET is [3], we need get [3] from BUCKET2
    // because BUCKET1 in use now
    // SO WE NEED [1, 9, 3] => [1, 9, (9-6)] and we need out [6]

    // out pub like code
    // Action(from: Bucket{index: BUCKET.BUCKETINF, max: Infinity, status: Infinity},
    //      to:  Bucket{index: BUCKET.BUCKET1, max: 8, status: 0})
    const bucket1: Bucket = {
        index: BUCKET.BUCKET1, max: 8, statu: 0
    };
    const bucket2: Bucket = {
        index: BUCKET.BUCKET2, max: 9, statu: 0
    };
    const bucketInf: Bucket = {
        index: BUCKET.BUCKETINF, max: Infinity, statu: Infinity
    }
    const actionFillB1: () => Action = () => new Action(bucketInf, bucket1);
    const actionEmptyB2: () => Action = () => new Action(bucket2, bucketInf);
    const actionB12B2: () => Action = () => new Action(bucket1, bucket2);
    const actionB22B1: () => Action = () => new Action(bucket2, bucket1);
    const TARGET = 4;
    actionFillB1();
    while (bucket1.statu !== TARGET) {
        actionB12B2();
        actionFillB1();
        actionB12B2();
        actionEmptyB2();
    }
})()