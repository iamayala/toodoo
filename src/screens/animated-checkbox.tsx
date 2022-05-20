import React, { useEffect } from 'react'
import Animated, {
    Easing, useSharedValue, useAnimatedProps, withTiming, interpolateColor
} from 'react-native-reanimated';
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg';

const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const checkMarkPath = 'M15 31.1977C23.1081 36.4884. 29.5946 43 29.5946 43C29.5946 43 37.5 25.5'
const outlineBoxPath = 'M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 6'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
    checked?: boolean
}

const AnimatedCheckBox = (props: Props) => {
    const { checked } = props
    const checkmarkcolor = '#000000'
    const highlightColor = '#ff0000'
    const boxOutlineColor = '#000000'

    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(checked ? 1 : 0, {
            duration: Easing.linear
        })
    }, [checked])

    const animatedBoxProps = useAnimatedProps(() => ({
        stroke: interpolateColor(
            Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
            [0,1],
            [boxOutlineColor, highlightColor],
            'RGB'
        ),
        fill: interpolateColor(
            Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
            [0,1],
            ['#000000', highlightColor],
            'RGB'
        )
    }), [highlightColor, boxOutlineColor ])


    return (
        <Svg viewBox={[ -MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN ].join(' ')}>
            <AnimatedPath
             d={outlineBoxPath} 
             strokeWidth={7} 
             strokeLinejoin="round"
             strokeLinecap="round"
             animatedProps={animatedBoxProps} />
            <Path d={checkMarkPath} stroke="black" />
        </Svg>
    )
}