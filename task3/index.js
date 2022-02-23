function Fighter(name, strength, agility, vitality) {
    if (strength + agility + vitality <= 30) {
        this.name = name;
        this.strength = strength;
        this.agility = agility;
        this.vitality = vitality;
    } else {
        alert(
            `Total points is ${
                strength + agility + vitality
            } strength, agility, vitality should have a total 30 points`
        );
    }
    this.getName = () => {
        return this.name;
    };
    let baseHp = 50;
    let totalHp =
        baseHp + this.vitality * 10 + this.strength * 5 + this.agility * 3;
    this.getHp = (hp = 0) => {
        totalHp = totalHp - hp;

        return totalHp;
    };
    this.takeDamage = (damage = 0) => {
        let baseDefense = 10;
        let totalDefense = 0;
        totalDefense =
            damage -
            (baseDefense +
                this.agility * 5 +
                this.strength * 3 +
                this.vitality);

        if (totalDefense < 0) {
            totalDefense = 0;
        }
        return totalDefense;
    };
    this.dealDamage = (rival = 0) => {
        let baseDamage = 10;
        let totalDamage = 0;
        totalDamage = baseDamage + this.strength * 5 + this.agility * 3 - rival;
        return totalDamage;
    };
}

fighter1 = new Fighter("mike", 7, 11, 12);
fighter2 = new Fighter("jayson", 13, 9, 8);

function fight(fighter1, fighter2) {
    let turn = 1;
    console.log(`Turn 0`);
    console.log(`${fighter1.getName()} HP ${fighter1.getHp()}`);
    console.log(`${fighter2.getName()} HP ${fighter2.getHp()}`);
    console.log(" ");
    while (fighter1.getHp() > 0 && fighter2.getHp() > 0) {
        console.log(`>>>>>Turn ${turn}<<<<<`);
        console.log(`${fighter1.getName()}'s turn to attack`);
        fighter2.getHp(fighter2.takeDamage(fighter1.dealDamage()));
        console.log(
            `${fighter1.getName()} attack with ${fighter1.dealDamage()} points and ${fighter2.getName()} defended and took ${fighter2.takeDamage(
                fighter1.dealDamage()
            )} damage`
        );
        console.log(`${fighter2.getName()} HP ${fighter2.getHp()}`);

        console.log(`${fighter2.getName()}'s turn to attack`);
        fighter1.getHp(fighter1.takeDamage(fighter2.dealDamage()));
        console.log(
            `${fighter2.getName()} attack with ${fighter2.dealDamage()} points and ${fighter1.getName()} defended and took ${fighter1.takeDamage(
                fighter2.dealDamage()
            )} points`
        );
        console.log(`${fighter1.getName()} HP ${fighter1.getHp()}`);

        console.log(" ");
        turn++;
        if (turn === 5000) {
            break;
        }
    }

    if (fighter1.getHp() > fighter2.getHp()) {
        console.log(`${fighter1.getName()} won`);
    } else {
        console.log(`${fighter2.getName()} won`);
    }
}
