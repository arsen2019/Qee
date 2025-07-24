import {DEFAULT_TIMEZONE, getTimeDifferenceFromYerevan} from "../../utils/dateUtils.ts";
import {useState} from "react";

export const TimezoneBanner = () => {

    const { localOffset, yerevanOffset, diffHours } = getTimeDifferenceFromYerevan();

    const [showBanner, setShowBanner] = useState(localOffset !== yerevanOffset);

    if (showBanner) {
        return (
            <div className="relative bg-yellow-100 border-l-4 border-yellow-400 p-3 mb-1 rounded-[8px] text-sm text-yellow-800">
                All times are shown in <strong>{DEFAULT_TIMEZONE} (UTC{yerevanOffset >= 0 ? `+${yerevanOffset}` : yerevanOffset})</strong>.
                You’re in UTC{localOffset >= 0 ? `+${localOffset}` : localOffset}, which is{' '}
                <strong>
                    {diffHours > 0
                        ? `${diffHours} hour${diffHours !== 1 ? 's' : ''} ahead`
                        : `${-diffHours} hour${diffHours !== -1 ? 's' : ''} behind`}
                </strong>.

                <div onClick={()=> {setShowBanner(false)}} className='absolute top-0 left-[100%] -translate-x-full pr-2 cursor-pointer hover:text-black'>x</div>
            </div>
        )
    }
    else {
        return null;
    }
}