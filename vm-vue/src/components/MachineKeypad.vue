<template>
    <div class="keypad">
        <div class="keypad-buttons">
            <div>
                <div id="A" class="button">A</div>
                <div id="B" class="button">B</div>
                <div id="C" class="button">C</div>
                <div id="D" class="button">D</div>
            </div>
            <div>
                <div id="1" class="button">1</div>
                <div id="2" class="button">2</div>
                <div id="3" class="button">3</div>
                <div id="4" class="button">4</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.keypad {
    display: flex;
    margin: 1rem;
    background-color: white;
    border-radius: 10px;
}
.keypad-buttons {
    display: flex;
    border: solid black 1px;
}
.button {
    width: 1rem;
    margin: .5rem;
    padding: .5rem;
    border: solid black 1px;
    border-radius: 5px;
    text-align: center;
}
.keypad-buttons div:nth-child(2) .button {
    margin-left: 0rem;
}
</style>
