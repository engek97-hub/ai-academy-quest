/* AI Academy Quest — reigning cohort champions.
   Non-invasive panel; activate after the classroom Supabase client is available:
   AAQChampions.mount(supabaseClient, document.querySelector('#champion-host'));
*/
window.AAQChampions = {
  async mount(client, host) {
    if (!client || !host) throw new Error('Supabase client and champion host required');
    const panel = document.createElement('section');
    panel.className = 'aaq-champions';
    panel.setAttribute('aria-label','Boot Camp Champions');
    panel.style.cssText='padding:14px;border:1px solid currentColor;border-radius:12px;margin:12px 0';
    const heading=document.createElement('h3');
    heading.textContent='Boot Camp Champions';
    panel.append(heading);
    const status=document.createElement('div');
    status.textContent='Loading champions…';
    panel.append(status);
    host.append(panel);
    const refresh=async()=>{
      const {data,error}=await client.rpc('aaq_current_champions');
      if(error){status.textContent='Champion list temporarily unavailable.';return;}
      status.replaceChildren();
      if(!data?.length){status.textContent='The first champion will be crowned after a completed classroom challenge.';return;}
      for(const c of data){
        const item=document.createElement('p');
        item.textContent='Cohort '+c.cohort+' — '+c.display_name+' · Week '+c.winning_week+' · '+c.total_points+' points';
        status.append(item);
      }
    };
    await refresh();
    return {refresh,element:panel};
  }
};
