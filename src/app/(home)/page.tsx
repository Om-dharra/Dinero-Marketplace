import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Progress} from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@radix-ui/react-checkbox';
export default function Home() {
  return (
    <div className='p-4'>
      <div className="flex flex-col gap-y-4">
      <div>
        <Button variant={'elevated'}>
          This is a Button
        </Button>
      </div>
      <div>
        <Input placeholder="Type something..." />
      </div>
      <div>
        <Progress value={50} className="w-full" />

      </div>
      <div>
        <Textarea placeholder="Type something..." />
      </div>
      <div>
        <Checkbox/>
      </div>


    </div>

    </div>
    
  );
}
