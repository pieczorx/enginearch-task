<script setup lang="ts">
import {onBeforeUnmount, onMounted, watch} from 'vue'
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  Placement,
  Alignment,
  size, autoPlacement, flip,
} from '@floating-ui/vue'

    interface Props {
        isTransparent?: boolean
        placement?: Placement
        isOpen?: boolean
        matchReferenceSize?: boolean
        offsetMainAxis?: number
        offsetCrossAxis?: number
        dropdownClass?: string
        alignment?: Alignment
        minimalAcceptableHeight?: number
        placementStrategy?: 'autoPlacement' | 'flip'
    }

    interface Emits {
        (e: 'hide'): void
    }

const props = withDefaults(defineProps<Props>(), {
  isTransparent: false,
  placement: 'bottom',
  isOpen: null,
  matchReferenceSize: false,
  offsetMainAxis: 5,
  offsetCrossAxis: 0,
  dropdownClass: null,
  alignment: 'start',
  minimalAcceptableHeight: 50,
  placementStrategy: 'autoPlacement',
})
const emit = defineEmits<Emits>()

const dropdownRef = $ref<HTMLElement>(null)
const referenceRef = $ref<HTMLElement>(null)

let isOpen = $ref<boolean>(props.isOpen)

watch(() => props.isOpen, (value) => {
  isOpen = value
})


// onClickOutside($$(contextMenuRef), () => {
//   isOpen = false
//   emit('hide')
// })

// useContextMenuOutside($$(referenceRef), () => {
//   isOpen = false
//   emit('hide')
// })


function onCoverClick() {
  isOpen = false
  emit('hide')
}

function matchReferenceSizeFactory() {
  return size({
    apply({rects}) {
      Object.assign(dropdownRef.style, {
        width: `${rects.reference.width}px`,
      })
    },
  })
}

function getPlacementMiddlewares() {
  return props.placementStrategy === 'autoPlacement' ?
    [
      autoPlacement({
        alignment: props.alignment,
        allowedPlacements: props.placement ? [props.placement] : undefined,
      }),
      size({
        apply({availableHeight, elements}) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(props.minimalAcceptableHeight, availableHeight)}px`,
          })
        },
      }),
      shift(),
    ]
    :
    [
      size({
        apply({availableHeight, elements}) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(props.minimalAcceptableHeight, availableHeight)}px`,
          })
        },
      }),
      flip({
        fallbackStrategy: 'initialPlacement',
      }),
      shift(),
    ]
}

let middlewares = [
  offset({
    mainAxis: props.offsetMainAxis,
    crossAxis: props.offsetCrossAxis,
  }),
  ...getPlacementMiddlewares(),
]


if(props.matchReferenceSize) {
  middlewares = [
    ...middlewares,
    matchReferenceSizeFactory(),
  ]
}

const {floatingStyles, update} = useFloating($$(referenceRef), $$(dropdownRef), {
  placement: props.placement,
  middleware: middlewares,
  transform: false,
  whileElementsMounted: autoUpdate,
})

const dropdownStyle = $computed(() => {
  return {
    // background: props.isTransparent ? 'transparent' : 'hsla(0,0%,20%,1)',
  }
})

const onOpenEvent = () => {
  if(typeof props.isOpen === 'boolean') {
    return
  }
  isOpen = true
}

onMounted(() => {
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', update)
})

const onReferenceClick = () => {
  onOpenEvent()
}

watch($$(referenceRef), (value, oldValue) => {
  oldValue?.removeEventListener('click', onReferenceClick)
  value?.addEventListener('click', onReferenceClick)
})

onBeforeUnmount(() => {
  if(referenceRef) {
    referenceRef.removeEventListener('click', onReferenceClick)
  }
})

function onClose() {
  isOpen = false
  emit('hide')
}

defineExpose($$({
  isOpen,
}))
</script>

<template>
  <div class="dropdown-wrapper" ref="referenceRef">
    <slot :isOpen="isOpen"/>
    <Teleport to="#teleported">
      <div class="cover" @click="onCoverClick" v-if="isOpen"/>
      <div
        class="dropdown"
        :class="dropdownClass"
        v-if="isOpen"
        ref="dropdownRef"
        :style="[floatingStyles, dropdownStyle]"
      >
        <slot name="dropdown" :isOpen="isOpen" :close="onClose"/>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
  .dropdown {
    position: fixed;
    filter: drop-shadow(0px 0px 16px rgba(0,0,0,.33));
    z-index: 999999;
    border-radius: 8px;
    overflow: hidden;
    background: white;
  }

  .cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
  }
</style>
