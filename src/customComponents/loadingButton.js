import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
export default function LoadingButton({callback,loading,title, variant="secondary", classes=""}){
    return(
        <Button className={`${classes}`} variant={variant} disabled={loading} onClick={callback}>
                        {loading && <Loader2 className="animate-spin" size={20} strokeWidth={2} />}
                        {loading ? "Please Wait" : title}
        </Button>
    )
}