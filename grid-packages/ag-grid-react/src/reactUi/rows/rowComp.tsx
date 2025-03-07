import React, { useEffect, useRef, useState, useMemo, memo, useContext, useLayoutEffect, useCallback } from 'react';
import { CellCtrl, RowContainerType, IRowComp, RowCtrl, UserCompDetails, ICellRenderer, CssClassManager, RowStyle } from 'ag-grid-community';
import { showJsComp } from '../jsComp';
import { isComponentStateless, getNextValueIfDifferent, agFlushSync } from '../utils';
import { BeansContext } from '../beansContext';
import CellComp from '../cells/cellComp';

const RowComp = (params: { rowCtrl: RowCtrl, containerType: RowContainerType }) => {

    const { context, gridOptionsService } = useContext(BeansContext);
    const { rowCtrl, containerType } = params;

    const tabIndex = rowCtrl.getTabIndex();
    const domOrderRef = useRef<boolean>(rowCtrl.getDomOrder());
    const isFullWidth = rowCtrl.isFullWidth();
    
    // Flag used to avoid problematic initialState setter funcs being called on a dead / non displayed row. 
    // Due to async rendering its possible for the row to be destroyed before React has had a chance to render it.
    const isDisplayed = rowCtrl.getRowNode().displayed; 
    const [rowIndex, setRowIndex] = useState<string | null>(() => isDisplayed ? rowCtrl.getRowIndex() : null);
    const [rowId, setRowId] = useState<string | null>(() => rowCtrl.getRowId());
    const [rowBusinessKey, setRowBusinessKey] = useState<string | null>(() => rowCtrl.getBusinessKey());

    const [userStyles, setUserStyles] = useState<RowStyle | undefined>(() => rowCtrl.getRowStyles());
    const [cellCtrls, setCellCtrls] = useState<CellCtrl[] | null>(() => null);
    const [fullWidthCompDetails, setFullWidthCompDetails] = useState<UserCompDetails>();

    // these styles have initial values, so element is placed into the DOM with them,
    // rather than an transition getting applied.
    const [top, setTop] = useState<string | undefined>(() => isDisplayed ? rowCtrl.getInitialRowTop(containerType) : undefined);
    const [transform, setTransform] = useState<string | undefined>(() => isDisplayed ? rowCtrl.getInitialTransform(containerType) : undefined);

    const eGui = useRef<HTMLDivElement | null>(null);
    const fullWidthCompRef = useRef<ICellRenderer>();

    const autoHeightSetup = useRef<boolean>(false);
    const [autoHeightSetupAttempt, setAutoHeightSetupAttempt] = useState<number>(0);

    // puts autoHeight onto full with detail rows. this needs trickery, as we need
    // the HTMLElement for the provided Detail Cell Renderer, however the Detail Cell Renderer
    // could be a stateless React Func Comp which won't work with useRef, so we need
    // to poll (we limit to 10) looking for the Detail HTMLElement (which will be the only
    // child) after the fullWidthCompDetails is set.
    // I think this looping could be avoided if we use a ref Callback instead of useRef,
    useEffect(() => {
        if (autoHeightSetup.current) { return; }
        if (!fullWidthCompDetails) { return; }
        if (autoHeightSetupAttempt > 10) { return; }

        const eChild = eGui.current?.firstChild as HTMLElement;
        if (eChild) {
            rowCtrl.setupDetailRowAutoHeight(eChild);
            autoHeightSetup.current = true;
        } else {
            setAutoHeightSetupAttempt(prev => prev + 1);
        }

    }, [fullWidthCompDetails, autoHeightSetupAttempt]);

    let cssClassManager = useRef<CssClassManager>();
    if (!cssClassManager.current) {
        cssClassManager.current = new CssClassManager(() => eGui.current);
    }
    const setRef = useCallback((e: HTMLDivElement) => {
        eGui.current = e;

        if (!eGui.current) {
            rowCtrl.unsetComp(containerType);
            return;
        }
        
        // because React is asynchronous, it's possible the RowCtrl is no longer a valid RowCtrl. This can
        // happen if user calls two API methods one after the other, with the second API invalidating the rows
        // the first call created. Thus the rows for the first call could still get created even though no longer needed.
        if (!rowCtrl.isAlive()) { return; }
        
        const compProxy: IRowComp = {
            // the rowTop is managed by state, instead of direct style manipulation by rowCtrl (like all the other styles)
            // as we need to have an initial value when it's placed into he DOM for the first time, for animation to work.
            setTop,
            setTransform,

            // i found using React for managing classes at the row level was to slow, as modifying classes caused a lot of
            // React code to execute, so avoiding React for managing CSS Classes made the grid go much faster.
            addOrRemoveCssClass: (name, on) => cssClassManager.current!.addOrRemoveCssClass(name, on),

            setDomOrder: domOrder => domOrderRef.current = domOrder,
            setRowIndex,
            setRowId,
            setRowBusinessKey,
            setUserStyles,
            // if we don't maintain the order, then cols will be ripped out and into the dom
            // when cols reordered, which would stop the CSS transitions from working
            setCellCtrls: (next, useFlushSync) => {
                agFlushSync(useFlushSync, () => {
                    setCellCtrls(prev => getNextValueIfDifferent(prev, next, domOrderRef.current));
                });
            },
            showFullWidth: compDetails => setFullWidthCompDetails(compDetails),
            getFullWidthCellRenderer: () => fullWidthCompRef.current,
            refreshFullWidth: getUpdatedParams => {
                if (canRefreshFullWidthRef.current) {
                    setFullWidthCompDetails(prevFullWidthCompDetails => ({
                        ...prevFullWidthCompDetails!,
                        params: getUpdatedParams()
                    }));
                    return true;
                } else {
                    if (!fullWidthCompRef.current || !fullWidthCompRef.current.refresh) {
                        return false;
                    }
                    return fullWidthCompRef.current.refresh(getUpdatedParams());
                }
            }
        };
        rowCtrl.setComp(compProxy, eGui.current, containerType);

    }, []);

    useLayoutEffect(() => showJsComp(fullWidthCompDetails, context, eGui.current!, fullWidthCompRef), [fullWidthCompDetails]);

    const rowStyles = useMemo(() => {
        const res = { top, transform };

        Object.assign(res, userStyles);
        return res;
    }, [top, transform, userStyles]);

    const showFullWidthFramework = isFullWidth && fullWidthCompDetails && fullWidthCompDetails.componentFromFramework;
    const showCells = !isFullWidth && cellCtrls != null;

    const reactFullWidthCellRendererStateless = useMemo(() => {
        const res = fullWidthCompDetails?.componentFromFramework && isComponentStateless(fullWidthCompDetails.componentClass);
        return !!res;
    }, [fullWidthCompDetails]);

    // needs to be a ref to avoid stale closure, as used in compProxy passed to row ctrl
    const canRefreshFullWidthRef = useRef(false);
    useEffect(() => {
        canRefreshFullWidthRef.current = reactFullWidthCellRendererStateless && !!fullWidthCompDetails && !!gridOptionsService.get('reactiveCustomComponents');
    }, [reactFullWidthCellRendererStateless, fullWidthCompDetails]);

    const showCellsJsx = () => cellCtrls?.map(cellCtrl => (
        <CellComp
            cellCtrl={cellCtrl}
            editingRow={rowCtrl.isEditing()}
            printLayout={rowCtrl.isPrintLayout()}
            key={cellCtrl.getInstanceId()}
        />
    ));

    const showFullWidthFrameworkJsx = () => {
        const FullWidthComp = fullWidthCompDetails!.componentClass;
        return (
            <>
                {
                    reactFullWidthCellRendererStateless
                    && <FullWidthComp  {...fullWidthCompDetails!.params} />
                }
                {
                    !reactFullWidthCellRendererStateless
                    && <FullWidthComp  {...fullWidthCompDetails!.params} ref={fullWidthCompRef} />
                }
            </>
        );
    };

    return (
        <div
            ref={setRef}
            role={'row'}
            style={rowStyles}
            row-index={ rowIndex }
            row-id={ rowId }
            row-business-key={ rowBusinessKey }
            tabIndex={tabIndex}
        >
            {showCells && showCellsJsx()}
            {showFullWidthFramework && showFullWidthFrameworkJsx()}
        </div>
    );
};

export default memo(RowComp);
