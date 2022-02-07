<template>
  <li
    :class="[!!letter ? 'filled' : '', hint, 'tile']"
    :style="{
      'animation-delay': hint ? `${animationDelay}ms` : '0ms',
      'transition-delay': hint ? `${animationDelay + 500}ms` : 'inherit',
    }"
  >
    {{ letter.toUpperCase() }}
  </li>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    animationDelay: Number,
    hint: String,
    letter: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tile {
  border: 1px solid #3a3a3c;
  margin: 0.2rem;
  width: 60px;
  height: 60px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
}

@keyframes pop {
  0%   { 
    transform: scale(1.0)
  }
  50%  { 
    transform: scale(1.15)
  }
  100% { 
    transform: scale(1.0)
  }
}

@keyframes rotate {
  0%   { 
    transform: perspective(150px) rotateX(0deg);
  }
  50% {
    transform: perspective(150px) rotateX(-90deg);
  }
  100% { 
    transform: perspective(150px) rotateX(0deg);
  }
}

.x, .o, ._ {
  transition: border-color;
  /* transition-delay: 500ms; */
}

@keyframes green-back {
  0%   { 
    background-color: rgba(0,0,0,0);
  }
  49% {
    background-color: rgba(0,0,0,0);
  }
  51% {
    background-color: var(--green);
  }
  100% { 
    background-color: var(--green);
  }
}
.tile.x {
  animation-name: rotate, green-back;
  animation-duration: 500ms;
  background-color: var(--green);
  border-color: var(--green);
}

@keyframes yellow-back {
  0%   { 
    background-color: rgba(0,0,0,0);
  }
  49% {
    background-color: rgba(0,0,0,0);
  }
  51% {
    background-color: var(--yellow);
  }
  100% { 
    background-color: var(--yellow);
  }
}
.tile.o {
  animation-name: rotate, yellow-back;
  animation-duration: 500ms;
  background-color: var(--yellow);
  border-color: var(--yellow);
}

@keyframes grey-back {
  0%   { 
    background-color: rgba(0,0,0,0);
  }
  49% {
    background-color: rgba(0,0,0,0);
  }
  51% {
    background-color: var(--grey);
  }
  100% { 
    background-color: var(--grey);
  }
}
.tile._ {
  animation-name: rotate, grey-back;
  animation-duration: 500ms;
  background-color: var(--grey);
  border-color: var(--grey);
}

@keyframes pop {
  0%   { 
    transform: scale(1.0)
  }
  50%  { 
    transform: scale(1.15)
  }
  100% { 
    transform: scale(1.0)
  }
}

.filled {
  animation-name: pop;
  animation-duration: 100ms;
  border-color: var(--light-grey);
}
</style>
