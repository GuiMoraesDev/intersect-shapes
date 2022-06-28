import React, { HTMLAttributes } from 'react';
import { FaTimes } from 'react-icons/fa';

import ReactPortal from '../ReactPortal';

import * as Styles from './styles';

export interface MiddlewareModalHandles {
  openModal(): void;
  closeModal(): void;
}

export interface MiddlewareModalDefaultPropsThatMakeStyles {
  dimension?: 'sm' | 'md' | 'lg' | 'full-size';
}

export interface MiddlewareModalProps
  extends MiddlewareModalDefaultPropsThatMakeStyles,
    HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean;
  onCloseModal?: () => void;
}

const MiddlewareModal: React.ForwardRefRenderFunction<
  MiddlewareModalHandles,
  MiddlewareModalProps
> = (
  {
    children,
    showCloseButton = true,
    dimension = 'full-size',
    onCloseModal,
    ...props
  },
  ref
) => {
  const popupRef = React.useRef<HTMLDivElement>(null);

  const isStorybook = React.useMemo(() => process.env.IS_STORYBOOK, []);

  const [visible, setVisible] = React.useState(!!isStorybook);

  React.useEffect(() => {
    if (visible) {
      popupRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'auto',
      });
    }
  }, [visible]);

  const openModal = React.useCallback(() => {
    return setVisible(true);
  }, []);

  const closeModal = React.useCallback(() => {
    onCloseModal?.();

    return setVisible(false);
  }, [onCloseModal]);

  React.useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!visible) {
    return null;
  }

  return (
    <ReactPortal>
      <Styles.Container {...props}>
        <Styles.ContentWrapper
          ref={popupRef}
          data-target="next-step-popup-component"
          dimension={dimension}
        >
          {showCloseButton && (
            <Styles.CloseTopButton type="button" onClick={closeModal}>
              <FaTimes className="icon" />
            </Styles.CloseTopButton>
          )}
          {children}
        </Styles.ContentWrapper>
      </Styles.Container>
    </ReactPortal>
  );
};

export default React.forwardRef(MiddlewareModal);
