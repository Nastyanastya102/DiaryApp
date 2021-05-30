// @flow
/**
 * <Experiment />
 *
 * @description
 *
 * A component that renders and (optionally) tracks a given experiment. See usage example below. The component
 * will track the experiment (via the ordinary tracking mechanisms) unless you specify it shouldn't, by setting
 * the `track` prop to `false`.
 *
 * It will fetch the experiment variant from state, and pass it back to you in a callback render function. It is
 * up to you to use that information to render the correct variant.
 *
 * @example
 * <Experiment name="name.of.experiment" track={true} data={{}}>
 *   {variant => (
 *     { variant === 1
 *       ? <ExperimentComponent />
 *       : <BaseComponent />
 *   )}
 * </Experiment>
 *
 */

import { onlyChild } from '../utils';

type RenderFn = React.ReactNode;

type Props = {
  children: RenderFn | [RenderFn];
};

const Experiment = ({ children }: Props) => {
  return onlyChild(children);
};

export default Experiment;
